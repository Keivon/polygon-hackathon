import hre from "hardhat";

async function main() {
    const verifierContract = "ZKPVerifier";
    const verifierName = "ERC20zkAirdrop";
    const verifierSymbol = "zkERC20";
    const ZKPVerifier = await hre.ethers.getContractFactory(verifierContract);
    const zKPVerifier = await ZKPVerifier.deploy();
  
    await zKPVerifier.deployed();
    console.log(verifierName, " tx hash:", zKPVerifier.address);
  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  