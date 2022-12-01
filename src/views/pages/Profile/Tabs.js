import React, { useState, useEffect, useContext } from "react";
import { Box, Container, makeStyles, Button } from "@material-ui/core";
import { UserContext } from "src/context/User";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import Loader from "src/component/Loader";

import Page from "src/component/Page";
import Auction from "./Auction";
import Bundles from "./Bundles";
import Subscriptions from "./Subscriptions";
import Feed from "./Feed";
import MyBids from "./MyBids";
import UserDetails from "./UserDetails";
import SoldBuyList from "./SoldBuyList";
import DonationsList from "./DonateList";
import TransactionHistory from "./TransactionsList";

const useStyles = makeStyles(() => ({
  Padding_Top: {
    paddingTop: "50px",
    backgroundColor: "#fff",
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "39px",
    color: "#000",
    paddingBottom: "10px",
  },
  active: {
    borderBottom: "2px solid #792034",
    borderRadius: "0px",
  },
}));

export default function Activity() {
  const auth = useContext(UserContext);
  const classes = useStyles();
  const [tabview, setTabView] = useState("bundles");
  const [subscriptions, setSubscription] = useState([]);
  const [feeds, setfeeds] = useState([]);
  const [privateFeeds, setPrivateFeeds] = useState([]);
  const [allFeed, setAllFeed] = useState([]);
  const [auction, setauction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myBidList, setmyBidList] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [donateUserList, setDonorUserList] = useState([]);
  const [soldOrderList, setSoldOrderList] = useState([]);
  const [buyOrderList, setBuyOrderList] = useState([]);



  const myFollowersHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.profileFollowersList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setFollowers(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const myFollowingHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.profileFollowingList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setFollowing(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  const getBundleListHandler = async () => {
    setIsLoading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.myauction,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsLoading(false);

        if (res.data.statusCode === 200) {
          setBundles(res.data.result);
        }
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err.message);
      });
  };

  const getBundlesubscriptionListHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.mysubscription,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setSubscription(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getFeedListHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.myfeed,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllFeed(res.data.result);
          setfeeds(res.data.result.public_Private.result);
          setPrivateFeeds(res.data.result.private.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const myAuctionNftListHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.listorder,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setauction(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const myBidListHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.myBid,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setmyBidList(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const soldOrderListHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.soldOrderList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setSoldOrderList(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const buyOrderListHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.buyOrderList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          console.log("buyOrderList-----", res.data.result);
          setBuyOrderList(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const donorUserListtHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.donateUserList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setDonorUserList(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (auth?.userData?.userType !== "User") {
      getBundleListHandler();
      donorUserListtHandler();
      setTabView("bundles");
    } else {
      setTabView("subscriptions");
    }
    myFollowersHandler();
    myFollowingHandler();
    soldOrderListHandler();
    getFeedListHandler();
    buyOrderListHandler();
    myAuctionNftListHandler();
    getBundlesubscriptionListHandler();
    myBidListHandler();
  }, [auth.userData]);

  return (
    <Page title="">
      <Box className={classes.Padding_Top}>
        {isLoading ? (
          <Loader />
        ) : (
          <Container maxWidth="xl">
            <Box>
              {auth?.userData?.userType !== "User" && (
                <Button
                  className={tabview === "bundles" ? classes.active : " "}
                  onClick={() => setTabView("bundles")}
                >
                  My Bundles
                </Button>
              )}
              <Button
                className={tabview === "subscriptions" ? classes.active : " "}
                onClick={() => setTabView("subscriptions")}
              >
                My subscriptions
              </Button>
              <Button
                className={tabview === "feed" ? classes.active : " "}
                onClick={() => setTabView("feed")}
              >
                My feed
              </Button>
              {auth?.userData?.userType !== "User" && (
                <Button
                  className={tabview === "auctions" ? classes.active : " "}
                  onClick={() => setTabView("auctions")}
                >
                  My auctions
                </Button>
              )}
              <Button
                className={tabview === "bids" ? classes.active : " "}
                onClick={() => setTabView("bids")}
              >
                My Bids
              </Button>
              {auth?.userData?.userType !== "User" && (
                <Button
                  className={tabview === "subscribe" ? classes.active : " "}
                  onClick={() => setTabView("subscribe")}
                >
                  Subscribers
                </Button>
              )}

              {auth?.userData?.userType !== "User" && (
                <Button
                  className={tabview === "donor" ? classes.active : " "}
                  onClick={() => setTabView("donor")}
                >
                  Supporter List
                </Button>
              )}
              {auth?.userData?.userType !== "User" && (
                <Button
                  className={tabview === "soldAuctions" ? classes.active : " "}
                  onClick={() => setTabView("soldAuctions")}
                >
                  Sold Auctions NFT
                </Button>
              )}
              <Button
                className={tabview === "BoughtAuctions" ? classes.active : " "}
                onClick={() => setTabView("BoughtAuctions")}
              >
                Bought Auctions NFT
              </Button>
              <Button
                className={
                  tabview === "DonateList" ? classes.active : " "
                }
                onClick={() => setTabView("DonateList")}
              >
                Donate Transaction
              </Button>
              <Button
                className={
                  tabview === "TransactionHistory" ? classes.active : " "
                }
                onClick={() => setTabView("TransactionHistory")}
              >
                Transaction History
              </Button>
            </Box>
            <Box>
              {tabview === "bundles" && (
                <Bundles bundles={bundles} updateList={getBundleListHandler} />
              )}
              {tabview === "subscriptions" && (
                <Subscriptions
                  subscriptions={subscriptions}
                  userList={following}
                />
              )}
              {tabview === "subscribe" && (
                <UserDetails
                  userList={followers}
                  type="subscribers"
                />
              )}
              {tabview === "feed" && (
                <Feed
                  feeds={feeds}
                  privateFeeds={privateFeeds}
                  allFeed={allFeed}
                  updateList={getFeedListHandler}
                />
              )}
              {tabview === "auctions" && (
                <Auction
                  auction={auction}
                  updateList={myAuctionNftListHandler}
                />
              )}
              {tabview === "BoughtAuctions" && (
                <SoldBuyList
                  isSold={false}
                  auction={buyOrderList}
                  updateList={myAuctionNftListHandler}
                  type="bought"
                />
              )}
              {tabview === "soldAuctions" && (
                <SoldBuyList
                  isSold={true}
                  auction={soldOrderList}
                  updateList={myAuctionNftListHandler}
                  type="sold"
                />
              )}
              {tabview === "bids" && (
                <MyBids 
                  auction={myBidList} 
                  updateList={myBidListHandler} 
                />
              )}
              {tabview === "donor" && (
                <UserDetails
                  userList={followers}
                  type="donor"
                />
              )}
              {tabview === "DonateList" && (
                <DonationsList />
              )}
              {tabview === "TransactionHistory" && (
                <TransactionHistory />
              )}
            </Box>
          </Container>
        )}
      </Box>
    </Page>
  );
}
