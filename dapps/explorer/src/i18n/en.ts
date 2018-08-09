/*
  Copyright (C) 2018-present evan GmbH. 
  
  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3, 
  as published by the Free Software Foundation. 
  
  This program is distributed in the hope that it will be useful, 
  but WITHOUT ANY WARRANTY; without even the implied warranty of 
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details. 
  
  You should have received a copy of the GNU Affero General Public License along with this program.
  If not, see http://www.gnu.org/licenses/ or write to the
  
  Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA, 02110-1301 USA,
  
  or download the license from the following URL: https://evan.network/license/ 
  
  You can be released from the requirements of the GNU Affero General Public License
  by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts of it
  on other blockchains than evan.network. 
  
  For more information, please contact evan GmbH at this address: https://evan.network/license/ 
*/

export const en = {
  "_explorer": {
    "abi": "ABI",
    "alias": "Alias",
    "balance": "Balance",
    "basecontract": {
      "abi-desc": "Change the ABI description manually, to create another view on this contract.",
      "add-role": "Add role",
      "add-role-desc": "Choose the role that should be added to the member.",
      "add-role-hint": "Hint",
      "add-role-hint-desc": "A new role is only added temporarily. To save the definition of the role, you must assign this role to a user.",
      "allow": "Allow",
      "allow-role-func": "Allow / Forbid Function",
      "allow-role-func-desc": "Do you want to allow or forbid a function?",
      "allow-role-modificationType": "Modification Type",
      "allow-role-modificationType-desc": "Specify the modification type that should be allowed / fobidden.",
      "allow-role-property": "Allow / Forbid property",
      "allow-role-property-desc": "Do you want to allow or forbid a property setting?",
      "allow-role-propertyType": "Property Type",
      "allow-role-propertyType-desc": "Specify if the property is a list or an entry.",
      "bc-address": "BC ENS",
      "check-role-func": "Permission Check",
      "check-role-func-desc": "Specify the function name to be verified. (e.g.: setEntry(bytes32,bytes32))",
      "choose-bc": "Choose business center",
      "choose-bc-desc": "If the contract is located within an business center, define it in the input field below. If not, leave the field blank.",
      "consumer-state": "Consumer State",
      "contract-invitation": {
        "text-body": "You are invited to the Task {{ contractAddress }}. Use the attachment action to accept the invitation.",
        "text-title": "Contract invitation"
      },
      "contract-my-state-changed": "My contract state was changed successfully.",
      "contract-state": "Contract State",
      "contract-state-changed": "Contract state was changed successfully.",
      "contract-states": {
        "0": "Initial",
        "1": "Error",
        "2": "Draft",
        "3": "PendingApproval",
        "4": "Approved",
        "5": "Active",
        "6": "VerifyFinished",
        "7": "Finished",
        "loading": "Loading...",
        "undefined": "Unknown"
      },
      "deny": "Forbid",
      "empty-role-add": "No role selected",
      "empty-role-add-desc": "Please select a roll.",
      "entry": "\"entry\"",
      "func": "Function",
      "has-permissions": {
        "false": "No role of the roles [ {{ role }} ] HAS RIGHTS to the function {{ input }} with the signature {{ signature }}.",
        "title": "Role Check",
        "true": "One of the roles [ {{ role }} ] HAS RIGHTS to the function {{ input }} with the signature {{ signature }}."
      },
      "invite-member": "Invite new Members",
      "listentry": "\"list\"",
      "member": "Member",
      "members": "Members",
      "my-state": "My State",
      "my-states": {
        "0": "Initial",
        "1": "Error",
        "2": "Draft",
        "3": "Rejected",
        "4": "Active",
        "5": "Finished",
        "loading": "Loading...",
        "undefined": "Unknown"
      },
      "new-ownership": "New Ownership",
      "no-permission": "You have no permissions to change this value or to add something.",
      "ownership-transfered": "Ownership was changed successfully",
      "permissions": "Permissions",
      "permitted-properties": "Permitted properties / functions",
      "public-property": "Public properties / functions (constant)",
      "remove": "Remove",
      "remove-role": "Delete Role",
      "remove-role-desc": "By removing the last role of a user, he is simultaneously deleted as a member of the contract. Note: Removing the user from the contract does not mean that the user loses the rights to previously shared data.",
      "role": "Role",
      "role-func-sig": "Function Signature",
      "role-property-sig": "Property Signature",
      "role-successfully-added": "Role was added successfully",
      "role-successfully-removed": "Role was removed successfully",
      "roles": "Roles",
      "roles-abi-members": "ABI",
      "set": "Set",
      "set-contract-state": "Set contract state",
      "set-my-contract-state": "Set my contract state",
      "set-operation-func": "Allow / Forbid setting property",
      "set-role-func": "Allow / Forbid function",
      "set-role-func-desc": "Enter the function name to be allowed / denied for this role.\n\nE.g.: setEntry(bytes32,bytes32)",
      "set-role-property": "Allow property",
      "set-role-property-desc": "Enter the property name to be allowed / denied for this role.",
      "setted-role-func": "Function was successfully permitted",
      "setted-role-property": "Property was successfully permitted",
      "signature": "Signature",
      "successfully-invited": "The new members were added successfully.",
      "transfer": "Transfer",
      "transfer-ownership": "Transfer Ownership",
      "transfer-ownership-question": "Do you realy want to transfer the ownership of this contract to an other user?"
    },
    "cancel": "Cancel",
    "change-id": "Change ID",
    "choose-abi-contracts": "Choose ABI",
    "choose-abi-contracts-desc": "Try to load an ABI definition of existing evan.network contracts and view the contract via this interface.",
    "configuration": "Configuration",
    "contract-address": "Contract address",
    "contract-ens-ipfs": "Contract / ENS Address",
    "contract-type": "Contract Type",
    "created": "Created",
    "data-schema": "Data Schema",
    "data-schema-desc": "Data schema to process and display user data of contracts.",
    "datacontract": {
      "add-custom-entries": "You can add properties that are not listed in the data schema. (e.g.: todos, todologs)",
      "add-list-entry": "Add List entry",
      "add-list-entry-question": "Do you want to save the current data?",
      "data": "Data",
      "data-analysis": "Data analyse",
      "data-schema": "Data schema",
      "encrypt-hashes": "Encrypt hashes",
      "encrypt-hashes-desc": "Encrypt and decrypts hashes.",
      "encryption": "Encryption Algorithm",
      "entries": "Entries",
      "entry-name": "Entry name",
      "entry-types": {
        "entry": "Eintrag",
        "list": "Liste"
      },
      "entry-updated": "The entry was saved successfully.",
      "explore-custom": "Explore custom entry",
      "format-list-entry-json": "Data Integrity",
      "format-list-entry-json-question": "It seems as if you want to store JSON data that does not correspond to any valid JSON format. Do you want to continue anyway?",
      "general": "General informations",
      "invalid-entry-update": "An error occurred",
      "invalid-entry-update-desc": "The data could not be saved. Please check if one of your assigned roles is authorized to set / remove this entry.",
      "listentry": "Listentry: ",
      "listentry-added": "List entry was added successfully.",
      "listentry-removed": "List entry was successfully removed",
      "no-data-found": "No data for the entry was found: ",
      "no-entries": "No entries available. If you know some, add them by yourself...",
      "no-entry-selected": "No entry selected, please select one...",
      "property": "Property",
      "remove-listentry": "Remove list entry",
      "remove-listentry-question": "This will remove the full data set from the list and they can not be recovered. Do you want to continue?",
      "required": "Required",
      "set-entry": "Set Entry",
      "set-entry-not-allowed": "You are not allowed to update the data of this entry.",
      "start-explorer-custom": "explore",
      "type": "Type",
      "update-entry": "Save entry",
      "update-entry-question": "Do you want to save the current data?",
      "use-configuration": "Use configuration",
      "use-dfs-storage": "Use DFS-Storage",
      "use-dfs-storage-desc": "Loads and saves the provided data into ipfs (needed to save large data).",
      "value": "Value"
    },
    "dbcp": {
      "active-version": "Active Version",
      "add-lang-key": "Add translation",
      "add-lang-key-desc": "You can find available language keys here: https://www.science.co.il/language/Locale-codes.php",
      "add-version": "Add Version",
      "add-version-desc": "Please insert the version key. In general, versions always consist of 3 numbers (Major, Minor, Snapshot), separated by dots: e.g. 1.0.0.",
      "author": "Author",
      "dapp": "DApp",
      "dapp-type": "DApp Type",
      "dbcp-for-address": "DBCP for address",
      "dbcp-update": "DBCP Update",
      "dbcp-version": "DBCP Schema Version",
      "description": "Description",
      "entrypoint": "Entrypoint",
      "files": "Files",
      "general": "General",
      "i18n": "I18N",
      "i18n-description": "Translations: Description",
      "i18n-name": "Translations: Name",
      "img-square": "Image square",
      "img-wide": "Image wide",
      "invalid-dbcp": "Invalid DBCP Definition",
      "invalid-dbcp-desc": "The data entered does not correspond to a valid JSON format. Please correct the format.",
      "invalid-lang-key": "Invalid language key",
      "invalid-lang-key-desc": "Please insert a language key.",
      "invalid-version-key": "Invalid Version Key",
      "invalid-version-key-desc": "An invalid version has been entered. In general, versions always consist of 3 numbers (Major, Minor, Snapshot), separated by dots: e.g. 1.0.0.",
      "ipfs-origin": "IPFS origin",
      "lang-key": "Language key",
      "lang-key-exists": "Invalid language key",
      "lang-key-exists-desc": "Language key already exists.",
      "name": "Name",
      "primary-color": "Primary color",
      "secondary-color": "Secondary color",
      "standalone": "Standalone",
      "tags": "Tags",
      "translation": "Translation",
      "update-dbcp": "Save current data",
      "update-dbcp-not-allowed": "You do not have the necessary permissions to update the DBCP configuration of this address.",
      "update-question": "DBCP Update",
      "update-question-desc": "Do you really want to save the current data?<br>Changes to this information can change the behavior of the associated application or even render it unusable.",
      "updated-fail": "DBCP Update failed",
      "updated-successfully": "DBCP updated successfully",
      "value-integrated": "Integrated",
      "value-standalone": "Fullscreen",
      "version": "Version",
      "version-already-exists": "Invalid Version",
      "version-already-exists-desc": "The specified version is already assigned",
      "version-key": "Version-Key",
      "params-missing": "Params missing: "
    },
    "details": "Sections",
    "enable-time-travel": "Enable \"Time Travel\"",
    "explore-desc": "Please insert a<br><b>Contract address or ENS address</b>",
    "explore-id": "Explore",
    "general-infos": "General informations",
    "general-infos-desc": "ID, Transaction status, ...",
    "generic-error": "Error",
    "generic-error-desc": "An error has occurred. Please try again.",
    "history": {
      "address": "Hash",
      "amount": "EVE",
      "block": "Block",
      "block-batch-count": "Amount of blocks to load",
      "block-batch-count-desc": "Using this option, X blocks are analyzed.",
      "blockHash": "BlockHash",
      "blockNumber": "BlockNumber",
      "blocks": "analyzed Blocks",
      "chainId": "ChainID",
      "condition": "Condition",
      "creates": "Creates",
      "eve-price": "EVE Price",
      "from": "From",
      "function": "Function",
      "gas": "Gas",
      "gasPrice": "GasPrice",
      "hash": "Hash",
      "input": "Input",
      "load-more": "load more",
      "nonce": "Nonce",
      "publicKey": "PublicKey",
      "r": "r",
      "raw": "Raw",
      "s": "s",
      "signature": "Signature",
      "standardV": "standardV",
      "stop-loading": "Stop loading",
      "to": "to",
      "transaction-load-count": "Amount of transactions to load",
      "transaction-load-count-desc": "When using this option, as many blocks are loaded until X transactions are found.",
      "transactionIndex": "TransactionIndex",
      "transactions": "Transactions",
      "type": "Type",
      "v": "v",
      "value": "Value"
    },
    "id": "ID",
    "interaction": {
      "abi-missing": "No ABI Definition found",
      "abi-missing-desc": "Please use a valid ABI definition. This can be adjusted via the configuration dialog at the top of the screen.",
      "constant-false": "Run Transaction",
      "constant-true": "Run Call",
      "inputs": "Inputs",
      "invalid-input-array": "Invalid Input Parameters",
      "invalid-input-array-desc": "The input parameters should represent an valid array where each index specifies one input parameter.",
      "result": "Result"
    },
    "invalid": "Invalid ID",
    "invalid-abi": "Invalid ABI",
    "invalid-abi-desc": "Please provide a valid ABI description. Its usally a stringified JSON Array.",
    "invalid-desc": "Please select an valid Contract / ENS Address.",
    "ok": "Ok",
    "open-dapp": "Open DApp",
    "opened-address": "Opened address",
    "owner": "Owner",
    "raw-mode": "Raw-Mode",
    "raw-mode-desc": "Displays the original data as JSON and no UI improvements are displayed.",
    "section": {
      "basecontract": "evan.network BaseContract",
      "basecontract-desc": "contract states, members and more",
      "contractinteraction": "Contract Interaction",
      "contractinteraction-desc": "run abi functions directly",
      "datacontract": "evan.network DataContract",
      "datacontract-desc": "listentries, mappings and more",
      "datacontract-detail": "evan.network DataContract",
      "dbcp": "DBCP",
      "dbcp-desc": "DBCP information status ",
      "general": "General informations",
      "transactionhistory": "Transaction History",
      "transactionhistory-desc": "detailed contract call log"
    },
    "time-travel": "Block",
    "time-travel-desc": "By activating this option, all information up to a certain configured block is loaded.",
    "use-configuration": "Use Configuration",
    "version": "Versions"
  },
  "explorer": "Explorer"
};
