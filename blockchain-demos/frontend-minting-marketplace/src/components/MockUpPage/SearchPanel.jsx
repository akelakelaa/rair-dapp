import React, { useState, useEffect, useCallback } from "react";
import InputField from "../common/InputField.jsx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import 'react-tabs/style/react-tabs.css';
import NftList from "./NftList/NftList.jsx";
import VideoList from "../video/videoList.jsx";
import FilteringBlock from "./FilteringBlock/FilteringBlock.jsx";

const SearchPanel = ({ primaryColor, textColor }) => {
  const [titleSearch, setTitleSearch] = useState("");
  const [sortItem, setSortItem] = useState("");
  const [mediaList, setMediaList] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    getContract();
  }, []);

  const getContract = async () => {
    const responseContract = await (
      await fetch("/api/contracts/full", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-rair-token": localStorage.token,
        },
      })
    ).json();
    const covers = responseContract.contracts.map((item) => ({
      id: item._id,
      productId: item.products?._id ?? "wut",
      blockchain: item.blockchain,
      collectionIndexInContract: item.products.collectionIndexInContract,
      contract: item.contractAddress,
      cover: item.products.cover,
      title: item.title,
      name: item.products.name,
      user: item.user,
      copiesProduct: item.products.copies,
      offerData: item.products.offers.map((elem) => ({
        price: elem.price,
        offerName: elem.offerName,
        offerIndex: elem.offerIndex,
        productNumber: elem.product,
      })),
    }));
    setData(covers);
  };

  const updateList = async () => {
    let response = await (
      await fetch("/api/media/list", {
        headers: {
          "x-rair-token": localStorage.token,
        },
      })
    ).json();
    if (response.success) {
      setMediaList(response.list);
    } else if (
      response?.message === "jwt expired" ||
      response?.message === "jwt malformed"
    ) {
      localStorage.removeItem("token");
    } else {
      console.log(response?.message);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      updateList();
    }
  }, []);

  const handleClick = useCallback(
    (cover) => {
      data.forEach((item) => {
        if (cover === item.cover) {
          console.log(1);
        }
      });
    },
    [data]
  );

  return (
    <div className="input-search-wrapper list-button-wrapper">
      <Tabs>
        <TabList className="category-wrapper">
          <Tab
            style={{
              backgroundColor: `var(--${primaryColor})`,
              color: `var(--${textColor})`,
            }}
            selectedClassName={`search-tab-selected-${
              primaryColor === "rhyno" ? "default" : "dark"
            }`}
            className="category-button-nft category-button"
          >
            NFT
          </Tab>

          <Tab
            style={{
              backgroundColor: `var(--${primaryColor})`,
              color: `var(--${textColor})`,
            }}
            selectedClassName={`search-tab-selected-${
              primaryColor === "rhyno" ? "default" : "dark"
            }`}
            className="category-button-videos category-button"
          >
            Videos
          </Tab>
        </TabList>
        <div style={{ position: "relative", display: "flex" }}>
          <InputField
            getter={titleSearch}
            setter={setTitleSearch}
            placeholder={"Search..."}
            customCSS={{
              backgroundColor: `var(--${primaryColor})`,
              color: `var(--${textColor})`,
              borderTopLeftRadius: "0",
              width: "100%",
            }}
            customClass="form-control input-styled"
          />
          <i className="fas fa-search fa-lg fas-custom" aria-hidden="true"></i>
          <FilteringBlock
            sortItem={sortItem}
            setSortItem={setSortItem}
            primaryColor={primaryColor}
            textColor={textColor}
            isFilterShow={true}
          />
        </div>
        <TabPanel>
          <NftList
            sortItem={sortItem}
            titleSearch={titleSearch}
            primaryColor={primaryColor}
            textColor={textColor}
            handleClick={handleClick}
            data={data}
          />
        </TabPanel>
        <TabPanel>
          <VideoList mediaList={mediaList} titleSearch={titleSearch} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SearchPanel;
