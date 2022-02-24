import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import "./AuthenticityBlock.css";

const AuthenticityBlock = ({ tokenData, selectedToken, title, collectionToken }) => {
    const [authCollection, setAuthCollection] = useState(false);

    const generateUrlColection = useCallback(() => {
        if (collectionToken) {
            let mass = collectionToken.split('/')
            if (mass.length > 0) {
                mass.pop();
                setAuthCollection(mass.join('/'));
            }
        } else {
            return false
        }
    }, [collectionToken])

    useEffect(() => {
        generateUrlColection();
    }, [generateUrlColection])

    return <div className="block-authenticity">
        {title && <div className="authenticity-title">Authenticity</div>}
        <div className="table-authenticity">
            <div className="table-authenticity-title">Action</div>
            {
                tokenData && <>
                    <div className="authenticity-box">
                        <div className="link-block">
                            <span><i className="fas fa-external-link-alt"></i></span>
                            {
                                tokenData.map((el, index) => {
                                    if (Number(el.token) === Number(selectedToken)) {

                                        return (
                                            <a
                                                className="nftDataPageTest-a-hover"
                                                key={index}
                                                href={el?.authenticityLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Etherscan transaction
                                            </a>
                                        );
                                    }
                                })
                            }
                        </div>
                        <div className="block-arrow">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </>
            }
            {
                authCollection && <div className="authenticity-box">
                    <div className="link-block">
                        <span><i className="fas fa-external-link-alt"></i></span>
                        <a
                            className="nftDataPageTest-a-hover"
                            href={authCollection}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Etherscan transaction
                        </a>
                    </div>
                    <div className="block-arrow">
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </div>
            }
            <div className="authenticity-box">
                <div className="link-block">
                    <span><i className="fas fa-external-link-alt"></i></span>
                    <p>View on IPFS</p>
                </div>
                <div className="block-arrow">
                    <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
};

export default AuthenticityBlock;
