// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// @creator: Fixfon
// @author:  Fixfon
// https://twitter.com/fixfondev
// https://github.com/fixfon

import '@openzeppelin/contracts/utils/Counters.sol';

// Created interface for ERC721 token to be used in this contract to call NFT contract

interface IERC721 {
  function tokenURI() external view returns (string memory);

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId
  ) external;

  function transferFrom(
    address,
    address,
    uint256
  ) external;
}

contract Auction {
    using Counters for Counters.Counter;

    uint public constant AUCTION_FEE_RATE =3; //percentage

  // Creating a struct to identify an auction item
  struct AuctionItem {
    uint256 id;
    address payable seller;
    uint256 nftTokenId;
    address highestBidder;
    uint256 highestBid;
    uint256 startPrice;
    uint256 startedAt;
    uint256 endAt;
    bool isSold;
    bool isEnded;
    bool isCanceled;
  }
    
  bool private locked;
  Counters.Counter private _auctionIdCounter;
  IERC721 public immutable contractAddress;
  mapping(uint256 => AuctionItem) public auctions;
  mapping(uint256 => mapping(address => uint256)) public bidList;

  // EVENTS
  event AuctionCreated(
    uint256 indexed auctionId,
    address seller,
    uint256 nftTokenId,
    uint256 startPrice,
    uint256 startedAt,
    uint256 endAt
  );

  event AuctionBid(uint256 indexed auctionId, address bidder, uint256 bid);

  event BidderWithdraw(uint256 indexed auctionId, address bidder, uint256 bid);

  event AuctionCanceled(
    uint256 indexed auctionId,
    address seller,
    uint256 nftTokenId
  );

  event AuctionEnded(uint256 indexed auctionId, bool isSold);

  event AuctionSold(
    uint256 indexed auctionId,
    bool isSold,
    address winner,
    uint256 bid
  );

  constructor(address _contractAddress) {
    contractAddress = IERC721(_contractAddress);
    locked = false;
  }

  function createAuction(
    uint256 _nftTokenId,
    uint256 _startPrice,
    uint256 _startTime,
    uint256 _endTime
  ) external {
    require(block.timestamp <= _startTime,"Auction start time must greater or equal now");
    require(_startTime < _endTime,"Auction can not end before it starts");
   
    require(_startPrice > 0, 'Start price must be greater than 0.');

    uint256 auctionId = _auctionIdCounter.current();
    _auctionIdCounter.increment();

    contractAddress.safeTransferFrom(msg.sender, address(this), _nftTokenId);

    auctions[auctionId] = AuctionItem(
      auctionId,
      payable(msg.sender),
      _nftTokenId,
      address(0),
      0,
      _startPrice,
      _startTime,
      _endTime,
      false,
      false,
      false
    );

    emit AuctionCreated(
      auctionId,
      msg.sender,
      _nftTokenId,
      _startPrice,
      _startTime,
      _endTime
    );
  }

  function bid(uint256 _auctionId)
    external
    payable
    checkEnded(_auctionId)
    checkNotStarted(_auctionId)
  {
    require(
      getAuction(_auctionId).seller != address(0),
      'Auction does not exist'
    );
    AuctionItem storage _auction = auctions[_auctionId];

    require(msg.value > _auction.highestBid, 'There is already a higher bid.');
    require(
      msg.value >= _auction.startPrice,
      'Bid amount must be greater than start price.'
    );
    require(
      msg.sender != _auction.seller,
      'You cannot bid on your own auction.'
    );

    if (_auction.highestBidder != address(0)) {
      bidList[_auctionId][_auction.highestBidder] += _auction.highestBid;
    }

    _auction.highestBidder = msg.sender;
    _auction.highestBid = msg.value;

    emit AuctionBid(_auctionId, msg.sender, msg.value);
  }

   function endAuction(uint256 _auctionId) public noRentry onlyAuctionCreator(_auctionId) {
    require(
      getAuction(_auctionId).seller != address(0),
      'Auction does not exist'
    );
    AuctionItem storage _auction = auctions[_auctionId];
      require(_auction.isEnded == false,"Auction is already completed");
      require(
        block.timestamp > _auction.endAt,
        'Auction has not ended yet. To cancel the auction, use cancelAuction function.'
      );

    _auction.isEnded = true;

    if (_auction.highestBidder != address(0)) {
      uint256 highestBid = _auction.highestBid;
      uint256 profit = _auction.highestBid - _auction.startPrice;
      uint256 auctionServiceFee = profit * AUCTION_FEE_RATE /100;
      uint256 auctioneerReceive = highestBid - auctionServiceFee;

      _auction.isSold = true;

      contractAddress.safeTransferFrom(
        address(this),
        _auction.highestBidder,
        _auction.nftTokenId
      );
      payable(_auction.seller).transfer(auctioneerReceive);

      emit AuctionSold(
        _auctionId,
        _auction.isSold,
        _auction.highestBidder,
        _auction.highestBid
      );
    } else {
      contractAddress.safeTransferFrom(
        address(this),
        _auction.seller,
        _auction.nftTokenId
      );

      emit AuctionEnded(_auctionId, _auction.isSold);
    }
  }

  function refundBid(uint256 _auctionId)
    external
    noRentry
    checkNotEnded(_auctionId)
  {
    require(
      getAuction(_auctionId).seller != address(0),
      'Auction does not exist'
    );

    uint256 _amount = bidList[_auctionId][msg.sender];
    require(_amount > 0, 'You have no bid to withdraw.');

    bidList[_auctionId][msg.sender] = 0;

    payable(msg.sender).transfer(_amount);

    emit BidderWithdraw(_auctionId, msg.sender, _amount);
  }

  function cancelAuction(uint256 _auctionId)
    external
    noRentry
    onlyAuctionCreator(_auctionId)
    checkEnded(_auctionId)
    checkNotStarted(_auctionId)
  {
    require(
      getAuction(_auctionId).seller != address(0),
      'Auction does not exist'
    );
    AuctionItem storage _auction = auctions[_auctionId];
    require(_auction.isCanceled == false, 'Auction has already been canceled.');

    _auction.isCanceled = true;
    _auction.isEnded = true;
    bidList[_auctionId][_auction.highestBidder] += _auction.highestBid;
    _auction.highestBidder = address(0);
    _auction.highestBid = 0;

    contractAddress.safeTransferFrom(
      address(this),
      _auction.seller,
      _auction.nftTokenId
    );

    emit AuctionCanceled(_auctionId, _auction.seller, _auction.nftTokenId);
  }

  // PUBLIC FUNCTIONS

  function getCurrentAuctionId() public view returns (uint256) {
    return _auctionIdCounter.current();
  }

  // Returns single auction item
  function getAuction(uint256 _auctionId)
    public
    view
    returns (AuctionItem memory)
  {
    AuctionItem memory _auction = auctions[_auctionId];
    require(_auction.seller != address(0), 'Auction does not exist');
    return _auction;
  }

  // Returns all auction items
  function getAuctionList() external view returns (AuctionItem[] memory) {
    uint256 currentAuctionId = getCurrentAuctionId();
    AuctionItem[] memory _auctionList = new AuctionItem[](currentAuctionId);

    for (uint256 i = 0; i < currentAuctionId; i++) {
      _auctionList[i] = auctions[i];
    }

    return _auctionList;
  }

  // Returns all auction items for a specific seller
  function getAuctionsOfSeller(address _seller)
    external
    view
    returns (AuctionItem[] memory)
  {
    AuctionItem[] memory _auctionList = new AuctionItem[](
      _auctionIdCounter.current()
    );
    uint256 _auctionCount = 0;

    for (uint256 i = 0; i < _auctionIdCounter.current(); i++) {
      if (auctions[i].seller == _seller) {
        _auctionList[_auctionCount] = auctions[i];
        _auctionCount++;
      }
    }

    AuctionItem[] memory _auctionListTrimmed = new AuctionItem[](_auctionCount);

    for (uint256 i = 0; i < _auctionCount; i++) {
      _auctionListTrimmed[i] = _auctionList[i];
    }

    return _auctionListTrimmed;
  }


  // MODIFIERS

  modifier noRentry() {
    require(!locked, 'No rentry allowed');
    locked = true;
    _;
    locked = false;
  }

  modifier checkNotStarted(uint256 _auctionId) {
    AuctionItem memory _auction = auctions[_auctionId];
    require(
      block.timestamp > _auction.startedAt,
      'Auction has not started yet.'
    );
    _;
  }

  modifier checkNotEnded(uint256 _auctionId) {
    AuctionItem memory _auction = auctions[_auctionId];
    require(
      (block.timestamp > _auction.endAt) || (_auction.isCanceled == true),
      'Auction has not ended yet.'
    );
    _;
  }

  modifier checkEnded(uint256 _auctionId) {
    AuctionItem memory _auction = auctions[_auctionId];
    require(
      (block.timestamp < _auction.endAt) || (_auction.isCanceled == false),
      'Auction has already ended.'
    );
    _;
  }

  modifier onlyAuctionCreator(uint256 _auctionId) {
    AuctionItem memory _auction = auctions[_auctionId];
    require(
      msg.sender == _auction.seller,
      'You are not the seller of this auction.'
    );
    _;
  }
}