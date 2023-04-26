import React, { useState } from "react";
import Link from "next/link";
import {FaUserAlt,FaRegImage,FaUserEdit} from 'react-icons/fa'
import {MdHelpCenter} from 'react-icons/md'
import {TbDownload} from 'react-icons/tb'
const iconMap = {
    'user': FaUserAlt,
    'userimage': FaRegImage,
    'useredit': FaUserEdit,
    'helpcenter': MdHelpCenter,
    'download': TbDownload
};
const DropDownMenu = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className="py-2 transition hover:text-neutral-500">{title}</div>
            {isOpen && (
                <div className="
                absolute 
                rounded-lg 
                border 
                w-60 
                bg-white
                transition">
                    {links.map((link, index) => {
                const IconComponent = iconMap[link.icon];
                return (
                    <div className="px-4 py-2 hover:bg-red-100">
                        <Link key={index} href={link.url}>
                            <div className="flex items-center">
                                {IconComponent && <IconComponent className="mr-2" />}
                                <span>{link.label}</span>
                            </div>
                        </Link>
                    </div>
                );
            })}
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
