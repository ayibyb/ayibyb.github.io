var Coins = {
  1: { Name: "Ethereum Network", ID: "1", Symbol: "ETH" },
  5: { Name: "Goerli Network", ID: "5", Symbol: "ETH" },
  25: { Name: "Cronos Network", ID: "25", Symbol: "CRO" },
  56: { Name: "Binance Network", ID: "56", Symbol: "BNB" },
  128: { Name: "Huobi Network", ID: "128", Symbol: "HB" },
  137: { Name: "Polygon Network", ID: "137", Symbol: "Matic" },
  250: { Name: "Fantom Network", ID: "250", Symbol: "FTM" },
  534: { Name: "Candle Network", ID: "534", Symbol: "CANL" },
  1284: { Name: "Moonbeam Network", ID: "1284", Symbol: "Moonbeam" },
  1285: { Name: "Moonriver Network", ID: "1285", Symbol: "Moonriver" },
  13381: { Name: "Phoenix Network", ID: "13381", Symbol: "PHX" },
  43114: { Name: "Avalanche Network", ID: "43114", Symbol: "Avax" },
};
var BeeFee = 0.0123456,
  CSVEtherTotal = 0,
  ContractFee,
  SendTokenBool = true,
  binanceLimit,
  polygonLimit,
  fantomLimit,
  SendFee,
  MyTokenBalance,
  myContract,
  TransferContract,
  TokenContract,
  PriceResult,
  CurrentTokenDecimals = 18,
  EthereumScan = "https://etherscan.io/tx/",
  GoerliETHScan = "https://goerli.etherscan.io/tx/",
  BinanceScan = "https://bscscan.com/tx/",
  PolygonScan = "https://polygonscan.com/tx/",
  FantomScan = "https://ftmscan.com/tx/",
  CronosScan = "https://cronoscan.com/tx/",
  AvalancheScan = "https://snowtrace.io/tx/",
  PhoenixScan = "https://phoenixplorer.com/tx/",
  RopstenScan = "https://ropsten.etherscan.io/tx/",
  KovanScan = "https://ropsten.etherscan.io/tx/",
  fantomTokenAddress = "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
  contractAdress,
  RopstenAddress = "0x41c7a5C572566bDD365a13A8875D32B3254121C0",
  KovanAddress = "0xE27E9B3dc1e4B076B40aC548a7fA1d4fDc609Ef3",
  BinanceTestContractAddress = "0xdC4D417552F5E42ac7D610B850BF1ff18fd4DbbB",
  EthereumContractAddress = "0xD9417303d53B08616d1f6e1423E8f5cfe07d2421",
  GoerliContractAddress = "0xeae5636189C67E07707aE110136A6b51fEB8cF2A",
  HuobiContractAddress = "0xA869b575445ea5398E3c0c3C812C32eb271dD6F4",
  BinanceContractAddress = "0x7a2aA2b2228FB108F60Cf07F1362E0D55e31c7D9",
  PolygonContractAddress = "0xfF3f092C759524CCdc2f15D0c070Fc956Bc68a73",
  FantomContractAddress = "0xfF3f092C759524CCdc2f15D0c070Fc956Bc68a73",
  AvalancheContractAddress = "0x7bf4950A24bc1D6DD6eD1CE4E3c4C50F33b6a358",
  CronosContractAddress = "0x53B1E66d7627e48DC5bf70ffe56CEc49EA63DdBb",
  PhoenixContractAddress = "0xfF3f092C759524CCdc2f15D0c070Fc956Bc68a73",
  CandleContractAddress = "0x7bf4950A24bc1D6DD6eD1CE4E3c4C50F33b6a358",
  MoonbeamContractAddress = "0x5B2643DB5fA7894e6630c8Ab56c828E9Ca186e0C",
  MoonriverContractAddress = "0x5B2643DB5fA7894e6630c8Ab56c828E9Ca186e0C",
  Isend,
  Iwant,
  isApporve = false;

async function CheckMetamaskConnection() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      return (
        await ethereum.enable(),
        window.ethereum.on("accountsChanged", function (accounts) {
          console.log("accountsChanges", accounts);
          window.location.reload();
        }),
        window.ethereum.on("networkChanged", function (chainId) {
          console.log("networkChanged", chainId);
          window.location.reload();
        }),
        true
      );
    } catch (err) {
      return false;
    }
  } else
    return window.web3
      ? ((window.web3 = new Web3(web3.currentProvider)), true)
      : (console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        ),
        false);
}
async function addList() {
  var html = "";
  // <a name="1" class="dropdown-item" href="#" onclick="ChooseBlockchain('1')"><img class="m-1" src="img/1.png" width="30" height="30" />Ethereum Network</a>
  // <a  name="25" class="dropdown-item" href="#" onclick="ChooseBlockchain('25')"><img class="m-1" src="img/25.png" width="30" height="30" />Cronos Network</a>
  // <a  name="56" class="dropdown-item" href="#" onclick="ChooseBlockchain('56')"><img class="m-1" src="img/56.png" width="30" height="30" />Binance Network</a>
  // <a  name="128" class="dropdown-item" href="#" onclick="ChooseBlockchain('128')"><img class="m-1" src="img/128.png" width="30" height="30" />Huobi Network</a>
  // <a  name="137" class="dropdown-item" href="#" onclick="ChooseBlockchain('137')"><img class="m-1" src="img/137.png" width="30" height="30" />Polygon Network</a>
  // <a  name="250" class="dropdown-item" href="#" onclick="ChooseBlockchain('250')"><img class="m-1" src="img/250.png" width="30" height="30" />Fantom Network</a>
  // <a  name="534" class="dropdown-item" href="#" onclick="ChooseBlockchain('534')"><img class="m-1" src="img/534.png" width="30" height="30" />Candle Network</a>
  // <a  name="1284" class="dropdown-item" href="#" onclick="ChooseBlockchain('1284')"><img class="m-1" src="img/1284.png" width="30" height="30" />Moonbeam Network</a>
  // <a  name="1285" class="dropdown-item" href="#" onclick="ChooseBlockchain('1285')"><img class="m-1" src="img/1285.png" width="30" height="30" />Moonriver Network</a>
  // <a  name="13381" class="dropdown-item" href="#" onclick="ChooseBlockchain('13381')"><img class="m-1" src="img/13381.png" width="30" height="30" />Phoenix Network</a>
  // <a  name="43114" class="dropdown-item" href="#" onclick="ChooseBlockchain('43114')"><img class="m-1" src="img/43114.png" width="30" height="30" />Avalanche Network</a>
  Object.keys(Coins).forEach(function (chainId) {
    (html += `<a name="`),
      (html += chainId),
      (html += `" class="dropdown-item" href="#" onclick="ChooseBlockchain('`),
      (html += chainId),
      (html += `')">`),
      (html += '<img class="m-1" src="img/'),
      (html += chainId == 5 ? 1 : Coins[chainId].ID),
      (html += '.png" width="30" height="30" />'),
      (html += Coins[chainId].Name),
      (html += "</a>");
  }),
    $("#ChooseBlockchainDIVid").append(html);
}
async function ActiveTokenContract() {
  $("#transactionHashLabel").html("");
  var errmsg = "";
  try {
    const toChecksumAddress = web3.utils.toChecksumAddress(
      document.getElementById("TokenAddress").value
    );
    console.log("toChecksumAddress", toChecksumAddress);
    if (toChecksumAddress) {
      let ret = await web3.eth.getCode(toChecksumAddress);
      console.log("===========>>>", ret);
      if (!ret) {
        errmsg = "Token Address does not exist on the current chain";
      }
    }
  } catch (err) {
    console.log("invalid ethereum address", err.message);
    TokenContractAddress = document.getElementById("TokenAddress").value;
    document.getElementById("TokenAddress").disabled = false;
    errmsg = "Token Address Wrong";
  }
  if (errmsg) {
    $("#approveThisButton").hide();
    $("#balanceOf").html(
      '<div style="color:red;font-size:15px;margin-top:10px;">' +
        errmsg +
        "</div>"
    );
    return;
  }
  $("#balanceOf").html("Loading..."),
    (document.getElementById("TokenAddress").disabled = true);
  var TokenAddress = document.getElementById("TokenAddress").value;
  (TokenContract = await new web3.eth.Contract(
    TokenSmartContractABI,
    TokenAddress,
    { from: web3.currentProvider.selectedAddress }
  )),
    console.log("generate TokenContract:", TokenContract),
    console.log("Use contract", contractAdress),
    console.log("Use token", TokenAddress);

  var _balanceOf = await balanceOf(
    web3.currentProvider.selectedAddress,
    TokenContract
  );
  console.log("Use token balanceOf", _balanceOf);
}
function SelectOptionChange() {
  SelectOptionIDOBJ = document.getElementById("SelectOptionID");
  console.log(
    SelectOptionIDOBJ.options[SelectOptionIDOBJ["selectedIndex"]].value
  );
  detectEthereumNetwork(
    SelectOptionIDOBJ.options[SelectOptionIDOBJ["selectedIndex"]].value
  );
}
async function GetEvents(contract, networdId) {
  var _events = [];
  await contract
    .getPastEvents("allEvents", {
      fromBlock: 1564545,
      toBlock: "latest",
    })
    .then((events) => (_events = events))
    .catch((err) => console.log(err));

  console.log(_events),
    (templateString =
      "<table class=table>  <tr>   <th>Initer Want</th>  <th>You send</th>  <th>You get</th>   <th>Initer Network</th>   </tr>"),
    $.each(_events, function (index) {
      _events[index]["returnValues"]["initOrder"] == "1" &&
        _events[index]["returnValues"]["NetworkIDIniterWant"] == networdId &&
        (templateString +=
          "<tr><td>" +
          _events[index]["returnValues"]["NetworkIDIniterWant"] +
          "</td><td>" +
          web3.utils.fromWei(
            _events[index]["returnValues"]["AmountIniterWant"],
            "ether"
          ) +
          "</td><td>" +
          web3.utils.fromWei(
            _events[index]["returnValues"]["_value"],
            "ether"
          ) +
          "</td><td>" +
          _events[index]["returnValues"]["_ContractNetworkID"] +
          "</td></tr>");
    }),
    (templateString += "</table>"),
    $("#EventTable").append(templateString);
}
async function getPairPrice() {
  var ISendValue = ISendobj["options"][ISendobj["selectedIndex"]].value,
    IWantValue = IWantobj["options"][IWantobj["selectedIndex"]].value;
  console.log("ISendValue:", ISendValue),
    console.log("IWantValue:", IWantValue),
    (FetchURL =
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Cbnb%2Cethereum%2Cbinancecoin&vs_currencies=usd"),
    console.log("FetchURL:", FetchURL),
    fetch(FetchURL)
      .then((data) => data.json())
      .then((data) => {
        var ETHPrice = data["ethereum"]["usd"],
          BNBPrice = data["binancecoin"]["usd"],
          MaticPrice = data["matic-network"]["usd"];
        console.log("ETHPrice:", ETHPrice),
          console.log("BNBPrice:", BNBPrice),
          console.log("MaticPrice:", MaticPrice);
        var ISendPrice, IWantPrice;
        if (ISendValue == "56") ISendPrice = BNBPrice;
        else {
          if (ISendValue == "137") ISendPrice = MaticPrice;
          else ISendValue == "1" && (ISendPrice = ETHPrice);
        }
        if (IWantValue == "56") IWantPrice = BNBPrice;
        else {
          if (IWantValue == "137") IWantPrice = MaticPrice;
          else IWantValue == "1" && (IWantPrice = ETHPrice);
        }
        return (
          console.log("ISendPrice:", ISendPrice),
          console.log("IWantPrice:", IWantPrice),
          (PriceResult = ISendPrice / IWantPrice),
          console.log("suggest price:", PriceResult.toFixed(18)),
          $("#PriceSuggest").html(PriceResult.toFixed(18)),
          ISendInputChange(),
          PriceResult
        );
      });
}
async function SendMultiToken() {
  console.log("Start SendMultiToken");

  var fileUpload = document.getElementById("fileUpload");
  console.log("fileUpload:", fileUpload);
  if (typeof FileReader === undefined) {
    $("#Tips").html(
      "Please choose a valid CSV file, CSV file name are English letters only,like: abc123.csv"
    );
    $("#dvCSV").html("");
    $("#loader1").hide();
    return;
  }
  if (
    document.getElementById("SendSameAmountRadio").checked &&
    (document.getElementById("MultiSendAmount").value == "" ||
      document.getElementById("AddressArea").value == "")
  ) {
    $("#Tips").html("Send amount or address should not be empty"),
      $("#loader1").hide();
    return;
  }
  console.log(
    "document.getElementById('MultiSendAmount').value",
    document.getElementById("MultiSendAmount").value
  );
  console.log("CurrentTokenDecimals:", CurrentTokenDecimals);
  console.log("init order contractAdress:", contractAdress);
  var addressArray = [],
    amountArray = [],
    totalETH = 0;
  if (document.getElementById("SendSameAmountRadio").checked) {
    var addressList = $("#AddressArea").val().split(/\n/);
    (addressArray = []), (amountArray = []);
    for (var index = 0; index < addressList.length; index++) {
      /\S/.test(addressList[index]) &&
        (addressArray.push($["trim"](addressList[index])),
        amountArray.push(
          BigInt(
            document.getElementById("MultiSendAmount").value *
              Math.pow(10, CurrentTokenDecimals.toString())
          ).toString()
        ),
        (totalETH =
          BigInt(totalETH) +
          BigInt(
            document.getElementById("MultiSendAmount").value *
              Math.pow(10, CurrentTokenDecimals.toString())
          )),
        (SendFee = (
          BigInt(totalETH) +
          BigInt(ContractFee) +
          BigInt(web3.utils.toWei(BeeFee.toString()))
        ).toString()));
    }
    console.log("TotalETH:", totalETH);
  } else {
    console.log("start read csv..."), (addressArray = []), (amountArray = []);
    let csvData = await ReadCSVtoArray();
    console.log("ReadCSVtoArrayOBJ:", csvData);
    if (typeof csvData == undefined || csvData == undefined) {
      console.log("read csv Error:"),
        $("#Tips").html(
          "Please choose a valid CSV file,csv file name are English letters only,like: abc123.csv"
        ),
        $("#dvCSV").html(""),
        $("#loader1").hide();
      return;
    } else {
      addressArray = csvData["_AddressArray"];
      amountArray = csvData["_AmountArray"];
      console.log("SendMultiToken CSVEtherTotal:", CSVEtherTotal);
      console.log("SendMultiToken SendFee:", SendFee);
    }
  }

  console.log("_AddressArray:", addressArray);
  console.log("_AmountArray:", amountArray);
  console.log("contractAdress:", contractAdress);
  _Contract = await new web3.eth.Contract(SmartContractABI, contractAdress, {
    from: web3.currentProvider.selectedAddress,
  });

  var tokenAddress = "";
  var isSendToken = document.getElementById("SendTokenRadioID").checked;
  if (isSendToken) {
    // 校验用户是否授权
    tokenAddress = document.getElementById("TokenAddress").value;
    // 激活token
    await ActiveTokenContract();
    if (!tokenAddress || CurrentTokenDecimals == 0) {
      $("#Tips").html("fill your token address first."), $("#loader1").hide();
      return;
    }
    // 去授权 owner, spender, amount
    var approve = await chekcApprove(contractAdress, SendFee);
    if (!approve) {
      $("#loader1").hide();
      return;
    }

    SendFee = 0;
  } else {
    tokenAddress = "0x0000000000000000000000000000000000000000";
  }

  var gasLimit = "2000000000001";
  console.log("FeeReciever:", FeeReciever);
  var gasPrice = await web3.eth.getGasPrice();
  console.log("gasPrice:" + gasPrice);
  var gas,
    referrerFee = web3.utils.toWei(BeeFee.toString());
  console.log("BeeFee:", BeeFee),
    (SendFee = SendFee.toString()),
    console.log("ReferrerFee wei:", referrerFee),
    console.log("_tokenContractAddress:", tokenAddress),
    console.log("totalFee:", SendFee),
    await _Contract.methods
      .multiSender(
        addressArray,
        amountArray,
        tokenAddress,
        FeeReciever,
        referrerFee
      )
      .estimateGas({
        from: web3.currentProvider.selectedAddress,
        value: SendFee,
      })
      .then(function (gasAmount) {
        gas = gasAmount;
      })
      .catch(function (error) {
        console.log("test error:", error), $("#loader1").hide();
      }),
    console.log("trans_estimate_gas:" + gas),
    document.getElementById("one-variable-equations").checked
      ? (console.log("high gas"),
        await _Contract.methods
          .multiSender(
            addressArray,
            amountArray,
            tokenAddress,
            FeeReciever,
            referrerFee
          )
          .send(
            {
              from: web3.currentProvider.selectedAddress,
              gas: gas,
              gasPrice: gasPrice,
              value: SendFee,
            },
            function (error, hash) {
              !error
                ? console.log("multiSender finish", hash)
                : (console.log(
                    "multiSender can not connect to the smart contract or less than 100"
                  ),
                  error.message.includes("User denied transaction signature") &&
                    (console.log("User denied transaction signature"),
                    $("#loader1").hide()));
            }
          )
          .once("transactionHash", function (hash) {
            console.log("hash:", hash);
            var href = BlockchainScan + hash;
            $("#transactionHashLabel").html(
              "Transaction Hash: <a href=" +
                href +
                ' target="_blank">' +
                hash +
                "</a>"
            );
          })
          .once("receipt", function (receipt) {
            console.log("receipt:", receipt),
              (document.getElementById("transactionHashLabel").style.color =
                "green"),
              $("#loader1").hide();
          }))
      : (console.log("low gas"),
        await _Contract.methods
          .multiSender(
            addressArray,
            amountArray,
            tokenAddress,
            FeeReciever,
            referrerFee
          )
          .send(
            { from: web3.currentProvider.selectedAddress, value: SendFee },
            function (error, hash) {
              !error
                ? console.log("multiSender finish", hash)
                : (console.log(
                    "multiSender can not connect to the smart contract or less than 100"
                  ),
                  error.message.includes("User denied transaction signature") &&
                    (console.log("User denied transaction signature"),
                    $("#loader1").hide()));
            }
          )
          .once("transactionHash", function (hash) {
            console.log("hash:", hash);
            var href = BlockchainScan + hash;
            $("#transactionHashLabel").html(
              "Transaction Hash: <a href=" +
                href +
                ' target="_blank">' +
                hash +
                "</a>"
            );
          })
          .once("receipt", function (receipt) {
            console.log("receipt:", receipt),
              (document.getElementById("transactionHashLabel").style.color =
                "green"),
              $("#loader1").hide();
          }));
}
async function GetEndTime() {
  await myContract.methods["EndTime"]().call(
    { from: web3.currentProvider.selectedAddress },
    function (error, result) {
      if (!error) {
        console.log("EndTime:", result);
        var endTime = result + "000";
        TimeCount(endTime);
      } else
        console.log("EndTime can not connect to the smart contract", error);
    }
  );
}
async function GetRewardPool() {
  await myContract.methods["RewardPool"]().call(
    { from: web3.currentProvider.selectedAddress },
    function (error, result) {
      !error
        ? (console.log("RewardPool:", result),
          (document.getElementById("RewardPool").innerHTML =
            "Reward coins Pool:" + web3.utils.fromWei(result, "ether")))
        : console.log(
            "RewardPool can not connect to the smart contract",
            error
          );
    }
  );
}
function addZero(num) {
  return num + "000000000000000000";
}
function component(a, b) {
  return Math.floor(a / b);
}
function TimeCount(times) {
  var time = setInterval(function () {
    var currentTime = new Date().getTime(),
      timeCount = times - currentTime,
      day = Math.floor(timeCount / 86400000),
      hour = Math.floor((timeCount % 86400000) / 3600000),
      min = Math.floor((timeCount % 3600000) / 60000),
      second = Math.floor((timeCount % 60000) / 1000);
    $("#days").html(day + "<span>Days</span>"),
      $("#hours").html(hour + "<span>Hours</span>"),
      $("#minutes").html(min + "<span>Minutes</span>"),
      $("#seconds").html(second + "<span>Seconds</span>"),
      timeCount < 0 &&
        (clearInterval(time),
        $("#days").html("0" + "<span>Days</span>"),
        $("#hours").html("0" + "<span>Hours</span>"),
        $("#minutes").html("0" + "<span>Minutes</span>"),
        $("#seconds").html("0" + "<span>Seconds</span>"),
        $("#OverTime").show());
  }, 1000);
}
function ChooseBlockchain(chainId) {
  console.log("nameID:", chainId), detectEthereumNetwork(chainId);
}
async function detectEthereumNetwork(chainId) {
  (bsc = {
    chainName: "Binance Smart Chain Mainnet",
    chainxName: "BNB",
    symbol: "BNB",
    rpcUrls: "https://bsc-dataseed1.binance.org/",
    blockExplorerUrls: "https://bscscan.com/",
  }),
    (polygon = {
      chainName: "Matic(Polygon) Mainnet",
      chainxName: "Matic",
      symbol: "MATIC",
      rpcUrls: "https://rpc-mainnet.matic.network",
      blockExplorerUrls: "https://polygonscan.com",
    }),
    (heco = {
      chainName: "Huobi ECO Chain Mainnet",
      chainxName: "HT",
      symbol: "HT",
      rpcUrls: "https://http-mainnet.hecochain.com",
      blockExplorerUrls: "https://hecoinfo.com",
    }),
    (fantom = {
      chainName: "Fantom Opera",
      chainxName: "FTM",
      symbol: "FTM",
      rpcUrls: "https://rpcapi.fantom.network",
      blockExplorerUrls: "https://ftmscan.com",
    }),
    (goerli = {
      chainName: "Goerli",
      chainxName: "ETH",
      symbol: "ETH",
      rpcUrls:
        "https://eth-goerli.g.alchemy.com/v2/7KR-Iq_bsMhhsKV2ueY1HycMYZ2yKtA5",
      blockExplorerUrls: "https://goerli.etherscan.io/",
    }),
    (_chainId = chainId),
    (networkId = await web3.eth.net.getId());
  console.log("networkId.", networkId);
  var network;
  if (_chainId == 5) {
    network = goerli;
  } else {
    if (_chainId == 56) network = bsc;
    else {
      if (_chainId == 128) network = heco;
      else {
        if (_chainId == 137) network = polygon;
        else _chainId == 250 && (network = fantom);
      }
    }
  }
  if (networkId == _chainId && networkId != 80001)
    return (
      console.log(
        "current network equl Select network id. does'nt need switch metamask"
      ),
      true
    );
  try {
    $("#Tips").html("Network Is wrong,Add or Switch now"),
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + decimalToHexString(parseInt(chainId)) }],
      }),
      window.location.reload();
  } catch (error) {
    console.log("error.code", error.code);
    if (error.code == 4902)
      try {
        console.log("not found network,now add it .", error.code),
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + decimalToHexString(parseInt(chainId)),
                chainName: network["chainName"],
                nativeCurrency: {
                  name: network["chainxName"],
                  symbol: network["symbol"],
                  decimals: 18,
                },
                rpcUrls: [network["rpcUrls"]],
                blockExplorerUrls: [network["blockExplorerUrls"]],
              },
            ],
          });
        return false;
        window.location.reload();
      } catch (error) {
        if (error.code == 4001)
          return (
            console.log("User reject .", error.message),
            $("#loader1").hide(),
            $("#Tips").html(""),
            false
          );
      }
    else {
      if (error.code == 4001)
        return (
          console.log("User reject switch network.", error.message),
          $("#loader1").hide(),
          $("#Tips").html(""),
          false
        );
    }
  }
  $("#Tips").html("");
}
function decimalToHexString(value) {
  return (
    value < 0 && (value = 0xffffffff + value + 1),
    value.toString(16).toUpperCase()
  );
}
function ISendInputChange() {
  parseFloat(document.getElementById("ISendInput").value) > 2 &&
    ((document.getElementById("IWantInput").value = parseInt(
      document.getElementById("ISendInput").value
    )),
    (document.getElementById("ISendInput").value = parseInt(
      document.getElementById("ISendInput").value
    )),
    $("#SendUSDDescription").html(
      "I Send " +
        (parseInt(document.getElementById("ISendInput").value) + 1) +
        " USDT"
    ),
    console.log("ISendInputChange"),
    console.log("polygonLimit", polygonLimit),
    console.log("binanceLimit", binanceLimit),
    console.log("fantomLimit", fantomLimit));
}
async function approveThis(spender) {
  try {
    if (isApporve) {
      return;
    }
    document.getElementById("approveThisButton").disabled = true;
    isApporve = true;
    const checkAddress = web3.utils.toChecksumAddress(
      document.getElementById("TokenAddress").value
    );
    console.log("checkAddress:", checkAddress);
  } catch (error) {
    console.log("approveThis:invalid ethereum address", error.message),
      (TokenContractAddress = document.getElementById("TokenAddress").value),
      (document.getElementById("TokenAddress").disabled = false);
    return;
  }
  $("#loader2").show();
  var tokenAddress = document.getElementById("TokenAddress").value;
  TokenContract = await new web3.eth.Contract(
    TokenSmartContractABI,
    tokenAddress,
    { from: web3.currentProvider.selectedAddress }
  );

  await TokenContract.methods
    .approve(
      spender,
      SendFee ||
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .send(
      { from: web3.currentProvider.selectedAddress },
      function (error, hash) {
        !error
          ? console.log("Approval successfull!", hash)
          : ($("#loader2").hide(),
            (document.getElementById("approveThisButton").disabled = true),
            console.log("Approval failed!"));
      }
    )
    .once("transactionHash", function (hash) {
      console.log("Approval hash:", hash);
    })
    .once("receipt", function (receipt) {
      console.log("Approval receipt:", receipt),
        $("#approveThisButton").hide(),
        $("#MultiSendButton").show(),
        $("#loader2").hide(),
        (document.getElementById("approveThisButton").disabled = false),
        (isApporve = false);
    });
}
async function getApproveStatus(owner, spender) {
  console.log("getApproveStatus..."),
    await TokenContract.methods
      .allowance(owner, spender)
      .call(
        { from: web3.currentProvider.selectedAddress },
        function (error, result) {
          !error &&
            (console.log("getApproveStatus:", result),
            result > 0
              ? ($("#approveThisButton").hide(),
                (document.getElementById("TokenAddress").disabled = false),
                console.log("Already approved!"))
              : ($("#approveThisButton").show(),
                (document.getElementById("TokenAddress").disabled = false),
                console.log("have not approved,please approve first!")));
        }
      );
}
async function balanceOf(account, TokenContract) {
  $("#balanceOf").html("Loading..."),
    await TokenContract.methods
      .balanceOf(account)
      .call(
        { from: web3.currentProvider.selectedAddress },
        function (error, result) {
          !error
            ? (console.log("balanceOf:", result),
              TokenContract.methods.decimals().call(function (err, ret) {
                var balance = parseInt(result);
                console.log("balance:", balance);
                var decimal = Math.pow(10, parseInt(ret)),
                  finalAmount = balance / decimal;
                console.log(
                  "finalAmount:",
                  finalAmount.toLocaleString("fullwide", {
                    useGrouping: false,
                  })
                ),
                  $("#balanceOf").html(
                    "Balance:" +
                      finalAmount.toLocaleString("fullwide", {
                        useGrouping: false,
                      })
                  ),
                  (CurrentTokenDecimals = BigInt(ret)),
                  console.log("TokenDecimals:", ret),
                  console.log("decimal * 10:", decimal),
                  console.log("balance:", BigInt(balance));
              }))
            : ($("#balanceOf").html("Can not read This token."),
              (document.getElementById("TokenAddress").disabled = false),
              console.log("balanceOf can not connect to the smart contract"));
        }
      );
}
function SendEtherOrToken(tokenType) {
  if (tokenType == "SendToken") {
    console.log("Choice: ", tokenType),
      (document.getElementById("SendTokenRadioID").checked = true),
      (document.getElementById("SendEtherRadioID").checked = false),
      (SendTokenBool = true),
      (SendFee = (
        BigInt(ContractFee) + BigInt(web3.utils.toWei(BeeFee.toString()))
      ).toString()),
      console.log("SendFee:", SendFee),
      $("#TokenInfoDiv").show(),
      (CurrentTokenDecimals = 0),
      $("#dvCSV").html(""),
      $("#Tips").html("");
  } else {
    tokenType == "SendEther" &&
      ((SendTokenBool = false),
      (SendFee = 0),
      console.log("Choice: ", tokenType),
      (document.getElementById("SendTokenRadioID").checked = false),
      (document.getElementById("SendEtherRadioID").checked = true),
      (CurrentTokenDecimals = 18),
      $("#TokenInfoDiv").hide());
    $("#MultiSendButton").show();
    $("#approveThisButton").hide();
  }
}
function SendType(sendType) {
  if (sendType == "SameAmount")
    console.log("Choice: ", sendType),
      (document.getElementById("SendSameAmountRadio").checked = true),
      (document.getElementById("SendDiffAmountRadio").checked = false),
      $("#SendSameAmountDiv")["show"](),
      $("#SendDiffAmountDiv").hide(),
      $("#dvCSV").html(""),
      $("#Tips").html("");
  else
    sendType == "UploadCSV" &&
      (console.log("Choice: ", sendType),
      (document.getElementById("SendSameAmountRadio").checked = false),
      (document.getElementById("SendDiffAmountRadio").checked = true),
      $("#SendSameAmountDiv").hide(),
      $("#SendDiffAmountDiv").show(),
      Upload());
}
function checkRadio(gasType) {
  if (gasType == "Medium")
    console.log("Choice: ", gasType),
      (document.getElementById("one-variable-equations").checked = true),
      (document.getElementById("multiple-variable-equations").checked = false),
      (UseHighGasFee = true),
      console.log("UseHighGasFee: ", UseHighGasFee);
  else
    gasType == "low" &&
      (console.log("Choice: ", gasType),
      (document.getElementById("multiple-variable-equations").checked = true),
      (document.getElementById("one-variable-equations").checked = false),
      (UseHighGasFee = false),
      console.log("UseHighGasFee: ", UseHighGasFee));
}
function Upload() {
  var fileData = document.getElementById("fileUpload"),
    fileReg = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (fileReg.test(fileData.value.toLowerCase())) {
    if (typeof FileReader != undefined) {
      var fileReader = new FileReader();
      (fileReader.onload = function (data) {
        var table = document.createElement("table"),
          csvDatas = data.target.result.split("\n");
        for (var i = 0; i < csvDatas.length; i++) {
          var row = table.insertRow(-1),
            csv_data = csvDatas[i].split(",");
          for (var j = 0; j < csv_data.length; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = csv_data[j];
          }
        }
        var dvCSV = document.getElementById("dvCSV");
        (dvCSV.innerHTML = ""), dvCSV.appendChild(table);
      }),
        fileReader.readAsText(fileData.files[0]);
    } else
      $("#Tips").html("This browser does not support HTML5."),
        $("#loader1").hide();
  } else
    $("#Tips").html(
      "Please choose a valid CSV file, CSV file name are English letters only,like: abc123.csv"
    ),
      $("#loader1").hide();
}
function multiply(_numberA, _numberB) {
  let _0x23dbc4 = 0,
    _0x223640 = 0;
  _numberA < 9 && ((_numberA *= 10), (_0x23dbc4 = 1));
  _numberB < 9 && ((_numberB *= 10), (_0x223640 = 1));
  let _0x4ceffc = [],
    _0x560326 = [];
  console.log(_numberA, _numberB);
  while (_numberA.length > 7) {
    _0x4ceffc.push(_numberA.substring(_numberA.length - 7, _numberA.length)),
      (_numberA = _numberA.substring(0, _numberA.length - 7));
  }
  _0x4ceffc.push(_numberA);
  while (_numberB.length > 7) {
    _0x560326.push(_numberB.substring(_numberB.length - 7, _numberB.length)),
      (_numberB = _numberB.substring(0, _numberB.length - 7));
  }
  _0x560326.push(_numberB),
    (_0x4ceffc = _0x4ceffc.reverse()),
    (_0x560326 = _0x560326.reverse()),
    console.log(_0x4ceffc, _0x560326);
  let _0x42987c = [];
  for (
    var i = _0x4ceffc.length - 0x1, _0x272cb7 = 0;
    i >= 0;
    i--, _0x272cb7++
  ) {
    _0x42987c[_0x272cb7] = _0x560326.map((_0xf7ea18) =>
      _0xf7ea18 * _0x4ceffc[i] === NaN ? "0000000" : _0xf7ea18 * _0x4ceffc[i]
    );
    var _0x5e9ee4 = 0;
    while (_0x5e9ee4 < _0x272cb7) {
      _0x42987c[_0x272cb7].push(0), (_0x5e9ee4 += 1);
    }
  }
  console.log(_0x42987c);
  var _0x279f3d = _0x42987c[_0x42987c.length - 1];
  for (var _0x272cb7 = 1; _0x272cb7 < _0x279f3d.length; _0x272cb7++) {
    for (var i = 0; i < _0x42987c.length - 1; i++) {
      _0x42987c[i].length >= _0x272cb7 &&
        (_0x279f3d[_0x279f3d.length - _0x272cb7] +=
          _0x42987c[i][_0x42987c[i].length - _0x272cb7]);
    }
  }
  console.log(_0x279f3d);
  let _0x303677 = [];
  for (var i = 0; i < _0x279f3d.length; i++) {
    _0x303677.push("");
  }
  for (var i = 1; i <= _0x279f3d.length; i++)
    if (i !== _0x279f3d.length)
      (_0x303677[_0x303677.length - i] = _0x279f3d[_0x279f3d.length - i]
        .toString()
        .substring(
          _0x279f3d[_0x279f3d.length - i].toString().length - 7,
          _0x279f3d[_0x279f3d.length - i].toString().length
        )),
        (_0x279f3d[_0x279f3d.length - i - 1] += parseInt(
          _0x279f3d[_0x279f3d.length - i]
            .toString()
            .substring(0, _0x279f3d[_0x279f3d.length - i].toString().length - 7)
        ));
    else _0x303677[0] = _0x279f3d[0];
  return (
    console.log(_0x303677),
    console.log(_numberA, _numberB),
    _0x23dbc4 && (_0x303677[_0x303677.length - 1] /= 10),
    _0x223640 && (_0x303677[_0x303677.length - 1] /= 10),
    _0x303677.join("")
  );
}

async function chekcApprove(spender, amount) {
  var tokenAddress = document.getElementById("TokenAddress").value;
  TokenContract = await new web3.eth.Contract(
    TokenSmartContractABI,
    tokenAddress,
    { from: web3.currentProvider.selectedAddress }
  );

  console.log("chekcApprove...");
  var allowance = await TokenContract.methods
    .allowance(web3.currentProvider.selectedAddress, spender)
    .call();
  console.log("token allowance:", allowance, "totalAmount:", amount);
  if (allowance && allowance > 0 && allowance >= amount) {
    return true;
  }
  $("#MultiSendButton").hide();
  $("#approveThisButton").show();
  document.getElementById("TokenAddress").disabled = false;
  console.log("have not approved,please approve first!");
  return false;
}

async function ReadCSVtoArray() {
  let userAddress = [],
    amounts = [];
  var fileData = document.getElementById("fileUpload"),
    fileReg = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (fileReg.test(fileData.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var fileReader = new FileReader();
      return (
        (fileReader.onload = function (data) {
          var table = document.createElement("table"),
            csvDatas = data.target.result.split("\n"),
            totalAmount = 0;
          for (var i = 0; i < csvDatas.length; i++) {
            var row = table.insertRow(-1),
              csv_data = csvDatas[i].split(",");
            // userAddress, Amount
            if (csv_data[0] != "" && csv_data[1] != "") {
              userAddress.push($.trim(csv_data[0]));
              var _amount = BigNumber(
                  parseInt(
                    csv_data[1] * Math.pow(10, CurrentTokenDecimals.toString())
                  ).toString()
                ),
                amount = web3.utils.toBN(_amount).toString();
              console.log("_amount:", _amount);

              (totalAmount =
                totalAmount +
                parseInt(web3.utils.toWei(parseFloat(csv_data[1]).toString()))),
                console.log("amount:", parseFloat(csv_data[1]), amount),
                amounts.push(amount);
            }
            for (var j = 0; j < csv_data.length; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = csv_data[j];
            }
          }
          console.log("Send ETH throgh CSV.....");
          CSVEtherTotal = totalAmount;
          console.log("CurrentTokenDecimals:", CurrentTokenDecimals);
          console.log("ReadCSVtoArray TotalAmount:", totalAmount);
          console.log("ReadCSVtoArray CSVEtherTotal:", CSVEtherTotal);
          var etherTotal = BigNumber(
              (
                CSVEtherTotal * Math.pow(10, CurrentTokenDecimals.toString())
              ).toString()
            ),
            eTotal = web3.utils.toWei(parseInt(etherTotal).toString());
          console.log("CSVEtherTotal", parseFloat(CSVEtherTotal));
          console.log("ContractFee", web3.utils.fromWei(ContractFee));
          console.log("BeeFee", parseFloat(BeeFee));
          SendFee =
            BigInt(CSVEtherTotal) +
            BigInt(parseInt(ContractFee)) +
            BigInt(web3.utils.toWei(BeeFee.toString()));
          console.log("parseFloat SendFee:", SendFee);
          SendFee = SendFee.toString();
          console.log("ReadCSVtoArray SendFee:", SendFee.toString());

          var dvCSV = document.getElementById("dvCSV");
          (dvCSV.innerHTML = ""), dvCSV.appendChild(table);
        }),
        fileReader.readAsText(fileData.files[0]),
        { _AddressArray: userAddress, _AmountArray: amounts }
      );
    } else
      $("#Tips").html("This browser does not support HTML5."),
        $("#loader1").hide();
  } else
    $("#Tips").html("Please upload a valid CSV file."), $("#loader1").hide();
}
