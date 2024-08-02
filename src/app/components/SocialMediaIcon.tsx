import React from 'react';

interface SocialMediaIconProps {
    platform: string;
    size?: number;
    className?: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ platform, size = 16, className = '' }) => {
    const iconPath = `/assets/${platform.toLowerCase()}.svg`;
    return (
        <img
            src={iconPath}
            alt={`${platform} icon`}
            width={size}
            height={size}
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
    );
};

export default SocialMediaIcon;