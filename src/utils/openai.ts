const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// A single large string containing all relevant ERC-7730 specification details and examples.
// Removed unnecessary author data and front matter to save tokens.
// Includes the original ERC-7730 spec content, the Aave and MakerDAO JSON examples, and the Natspec-to-ERC-7730 reasoning.
// Formatted as a single string without triple backticks inside the variable.

const FULL_ERC_7730_SPEC = "This specification defines a JSON format (ERC-7730) that enriches the structured data of smart contract calls and EIP-712 messages with additional formatting and metadata, enabling wallets to display human-readable transaction or message details before signing.\n\n" +
"Motivation:\n" +
"- Users need to clearly understand what they are signing.\n" +
"- ABIs and EIP-712 types are insufficient for a fully readable and secure review.\n" +
"- ERC-7730 adds formatting instructions, enumerations, token decimals, and user-friendly labels.\n" +
"- DApps can write one ERC-7730 file that multiple wallets can use.\n\n" +
"Core Concepts:\n" +
"- The ERC-7730 file is a JSON with three main sections: context, metadata, and display.\n" +
"- context: Defines applicability conditions (e.g., which contract addresses, chainIds, or EIP-712 domain parameters match this file).\n" +
"- metadata: Provides constants, owner info, token details, enums.\n" +
"- display: Defines formats for each function or message type, specifying labeling, formatting of fields, and required fields.\n" +
"- Paths: #. for structured data fields, $. for references to the ERC-7730 file itself, @. for container fields (e.g., EVM tx fields like @.to or @.value).\n" +
"- Includes: One ERC-7730 file can include another to share common definitions.\n\n" +
"Supported Structured Data:\n" +
"- EVM smart contract calls (using ABIs)\n" +
"- EIP-712 typed messages\n" +
"In the future, possibly meta transactions and EIP-4337 user operations.\n\n" +
"Context:\n" +
"- For smart contracts: 'contract.abi' and 'contract.deployments' must match.\n" +
"- For EIP-712: 'eip712.schemas' defines types, 'eip712.domain' and 'eip712.deployments' or 'domainSeparator' must match to apply formatting.\n\n" +
"Metadata:\n" +
"- 'owner' and 'info' provide contract or message owner details.\n" +
"- 'token': { name, ticker, decimals } for token formatting if not on-chain.\n" +
"- 'constants': Arbitrary constants.\n" +
"- 'enums': Maps integer values to display strings.\n\n" +
"Display:\n" +
"- 'definitions': reusable field format specs.\n" +
"- 'formats': defines how each function/message is displayed. Keys can be function signatures or EIP-712 primary types.\n" +
"- Each format has 'intent' (user-friendly intent), 'fields', and 'required' arrays.\n" +
"- Fields specify 'label', 'format' (e.g. raw, tokenAmount, enum, addressName), and 'params'.\n\n" +
"Field Formats Examples:\n" +
"- raw: just display the value.\n" +
"- amount, tokenAmount: display integers as amounts with ticker, decimals.\n" +
"- date, duration: interpret integers as timestamps or durations.\n" +
"- enum: map integer values to strings via metadata enums.\n" +
"- addressName: attempt to resolve address to ENS or local name.\n" +
"- calldata: nested calls, if supported.\n\n" +
"Security:\n" +
"- Wallet must ensure context matches before applying ERC-7730 file.\n" +
"- Prevents using the wrong ERC-7730 file on unrelated data.\n\n" +
"Example: Aave Lending Pool v2\n" +
"{\"$schema\":\"../../specs/erc7730-v1.schema.json\",\"context\":{\"$id\":\"Lending Pool v2\",\"contract\":{\"abi\":\"https://github.com/LedgerHQ/ledger-asset-dapps/blob/211e75ed27de3894f592ca73710fa0b72c3ceeae/ethereum/aave/abis/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9.abi.json\",\"deployments\":[{\"chainId\":1,\"address\":\"0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9\"}]}},\"metadata\":{\"owner\":\"Aave\",\"info\":{\"url\":\"https://aave.com\",\"legalName\":\"Aave DAO\",\"lastUpdate\":\"2020-11-30T09:25:48Z\"},\"enums\":{\"interestRateMode\":{\"1\":\"stable\",\"2\":\"variable\"}},\"constants\":{\"max\":\"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\"}},\"display\":{\"formats\":{\"repay(address,uint256,uint256,address)\":{\"$id\":\"repay\",\"intent\":\"Repay loan\",\"fields\":[{\"path\":\"amount\",\"format\":\"tokenAmount\",\"label\":\"Amount to repay\",\"params\":{\"tokenPath\":\"asset\",\"threshold\":\"$.metadata.constants.max\",\"message\":\"All\"}},{\"path\":\"rateMode\",\"format\":\"enum\",\"label\":\"Interest rate mode\",\"params\":{\"$ref\":\"$.metadata.enums.interestRateMode\"}},{\"path\":\"onBehalfOf\",\"format\":\"addressName\",\"label\":\"For debt holder\",\"params\":{\"types\":[\"eoa\"],\"sources\":[\"local\",\"ens\"]}}],\"required\":[\"amount\",\"rateMode\",\"onBehalfOf\"]},\"setUserUseReserveAsCollateral(address,bool)\":{\"intent\":\"Manage collateral\",\"fields\":[{\"path\":\"asset\",\"format\":\"addressName\",\"label\":\"For asset\",\"params\":{\"types\":[\"token\"],\"sources\":[\"local\",\"ens\"]}},{\"path\":\"useAsCollateral\",\"format\":\"raw\",\"label\":\"Enable use as collateral\"}],\"required\":[\"asset\",\"useAsCollateral\"]},\"withdraw(address,uint256,address)\":{\"intent\":\"Withdraw\",\"fields\":[{\"path\":\"amount\",\"format\":\"tokenAmount\",\"label\":\"Amount to withdraw\",\"params\":{\"tokenPath\":\"asset\",\"threshold\":\"$.metadata.constants.max\",\"message\":\"Max\"}},{\"path\":\"to\",\"format\":\"addressName\",\"label\":\"To recipient\",\"params\":{\"types\":[\"eoa\"],\"sources\":[\"local\",\"ens\"]}}],\"required\":[\"amount\",\"to\"]},\"swapBorrowRateMode(address,uint256)\":{\"intent\":\"Swap interest rate mode\",\"fields\":[{\"path\":\"asset\",\"format\":\"addressName\",\"label\":\"For asset\",\"params\":{\"types\":[\"token\"],\"sources\":[\"local\",\"ens\"]}},{\"path\":\"rateMode\",\"format\":\"enum\",\"label\":\"Set interest rate mode to\",\"params\":{\"$ref\":\"$.metadata.enums.interestRateMode\"}}],\"required\":[\"asset\",\"rateMode\"]},\"borrow(address,uint256,uint256,uint16,address)\":{\"intent\":\"Borrow\",\"fields\":[{\"path\":\"amount\",\"format\":\"tokenAmount\",\"label\":\"Amount to borrow\",\"params\":{\"tokenPath\":\"asset\"}},{\"path\":\"interestRateMode\",\"format\":\"enum\",\"label\":\"Interest Rate mode\",\"params\":{\"$ref\":\"$.metadata.enums.interestRateMode\"}},{\"path\":\"onBehalfOf\",\"format\":\"addressName\",\"label\":\"Debtor\",\"params\":{\"types\":[\"eoa\"],\"sources\":[\"local\",\"ens\"]}}],\"required\":[\"amount\",\"onBehalfOf\",\"interestRateMode\"]},\"deposit(address,uint256,address,uint16)\":{\"$id\":\"deposit\",\"intent\":\"Supply\",\"fields\":[{\"path\":\"amount\",\"format\":\"tokenAmount\",\"label\":\"Amount to supply\",\"params\":{\"tokenPath\":\"asset\"}},{\"path\":\"onBehalfOf\",\"format\":\"addressName\",\"label\":\"Collateral recipient\",\"params\":{\"types\":[\"eoa\"],\"sources\":[\"local\",\"ens\"]}}],\"required\":[\"amount\",\"onBehalfOf\"]}}}}\n\n" +
"Example: MakerDAO DAI Permit\n" +
"{\"$schema\":\"../../specs/erc7730-v1.schema.json\",\"context\":{\"eip712\":{\"domain\":{\"name\":\"Dai Stablecoin\",\"version\":\"1\"},\"deployments\":[{\"chainId\":42,\"address\":\"0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa\"}]}},\"includes\":\"../../ercs/eip712-erc2612-permit.json\",\"metadata\":{\"owner\":\"MakerDAO\",\"info\":{\"legalName\":\"Maker Foundation\",\"url\":\"https://makerdao.com/\",\"lastUpdate\":\"2017-12-18T00:00:00Z\"},\"token\":{\"name\":\"Dai Stablecoin\",\"ticker\":\"DAI\",\"decimals\":18}},\"display\":{\"formats\":{\"Permit\":{\"screens\":{\"stax\":[{\"type\":\"propertyPage\",\"label\":\"DAI Permit\",\"content\":[\"spender\",\"value\",\"deadline\"]}]}}}}}\n\n" +
"Another Example: ERC-20 Transfer (USDT):\n" +
"Shows how to define 'transfer(address,uint256)' formatting. The ERC-7730 references an ABI and known deployments, sets metadata for owner and token info, and in display defines how to show 'To' and 'Amount' fields.\n\n" +
"Natspec Integration:\n" +
"It’s possible to use Natspec from a contract’s source code to help generate ERC-7730 files. Natspec gives developer-oriented documentation, but not all needed fields (like token decimals) can be inferred. A combined approach:\n" +
"- Input: ABI, Natspec, plus external data (like token decimals, enums).\n" +
"- Use a script or tool (with or without ChatGPT) to map Natspec descriptions to ERC-7730 labels and intent.\n" +
"- Some parameters (thresholds, token decimals) must come from external sources.\n" +
"- A proof-of-concept could compile a contract, extract ABI and Natspec, then call ChatGPT with the entire ERC-7730 spec plus examples, requesting a generated ERC-7730 file.\n\n";

export async function generateMetadata(
  apiKey: string,
  abi: any[],
  natspec: { devdoc: any; userdoc: any }
): Promise<string> {
  const systemMessage = {
    role: 'system',
    content: "You are an expert at generating ERC-7730 metadata files from contract ABIs and Natspec. Use the following complete reference to guide your output:\n" + FULL_ERC_7730_SPEC
  };

  const userMessage = {
    role: 'user',
    content: "Given the following ABI: " + JSON.stringify(abi) + " and Natspec: " + JSON.stringify(natspec) + ", generate a valid ERC-7730 metadata JSON file strictly adhering to the given specification and examples. Provide a proper 'context', 'metadata', and 'display' section. Be concise and ensure correctness."
  };

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [systemMessage, userMessage],
      temperature: 0.1,
      max_tokens: 10000
    })
  });

  const json = await response.json();
  return json.choices[0].message.content;
}
