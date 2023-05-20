import React, {  useState, useContext } from "react";

import { Container, CustomButton } from "@/components/componentsindex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "@/context/NFTMarketplaceContext";
const uploadNFT = () => {
    const { createNFT } = useContext(NFTMarketplaceContext)
    const [fileUrl, setFileUrl] = useState(null)
    const [file, setFile] = useState()
    const [formInput, setFormInput] = useState({ price: '', name: '', description: '' })
   
    return (

        <Container >
            <div className="mb-10 w-3/5 mx-auto">
                <div className="border-b">
                    <h1 className="text-center">Create New NFT</h1>
                    <p>
                        You can set preferred display name, create your profile URL and
                        manage other personal settings.
                    </p>
                </div>

                <div >
                    <h2>Image, Video, Audio, or 3D Model</h2>
                    <p>
                        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                        GLB, GLTF. Max size: 100 MB
                    </p>
                </div>
                <div>
                    <input
                        placeholder="Asset Name"
                        className="mt-8 border rounded p-4"
                        onChange={e => setFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Asset Description"
                        className="w-full mt-2 border rounded p-4"
                        onChange={e => setFormInput({ ...formInput, description: e.target.value })}
                    />
                    <input
                        placeholder="Asset Price in Eth"
                        className="mt-2 border rounded p-4"
                        onChange={e => setFormInput({ ...formInput, price: e.target.value })}
                    />
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                    {
                        fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl} />
                        )
                    }
                    <CustomButton restStyles="mt-5" title="Create NFT" handleClick={async () => createNFT(formInput.name, formInput.price, formInput.description, file)} />
                </div>
            </div>
        </Container>
    );
};

export default uploadNFT;