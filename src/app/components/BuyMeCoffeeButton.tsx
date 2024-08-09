import React from 'react';

const BuyMeCoffeeButton = () => {
    return (
        <div className='bottom-5 right-5 z-[10000]'>
            <a href="https://www.buymeacoffee.com/ram.barani" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png"
                    alt="Buy Me A Coffee"
                    style={{ height: '44px', width: '200px' }}
                />
            </a>
        </div>
    );
};

export default BuyMeCoffeeButton;