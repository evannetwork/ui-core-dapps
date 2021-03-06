/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see http://www.gnu.org/licenses/ or
  write to the Free Software Foundation, Inc., 51 Franklin Street,
  Fifth Floor, Boston, MA, 02110-1301 USA, or download the license from
  the following URL: https://evan.network/license/
*/

export const de = {
  "_explorer": {
    "abi": "ABI",
    "alias": "Alias",
    "balance": "Balance",
    "basecontract": {
      "abi-desc": "Ändern Sie die ABI Definition manuell, um die Ansicht auf den Vertrag zu ändern.",
      "add-role": "Rolle hinzufügen",
      "add-role-desc": "Wählen Sie die Rolle, die dem Mitglied hinzugefügt werden soll.",
      "add-role-hint": "Hinweis",
      "add-role-hint-desc": "Eine neue Rolle wird nur temporär hinzugefügt. Damit die Definition der Rolle gespeichert wird, müssen sie diese Rolle einem Nutzer zuweisen.",
      "allow": "Erlauben",
      "allow-role-func": "Function erlauben / verbieten",
      "allow-role-func-desc": "Wollen Sie eine Funktion erlauben oder verbieten?",
      "allow-role-modificationType": "Modifikationstype",
      "allow-role-modificationType-desc": "Geben Sie die Modifikationsart an, die erlaubt / verboten sein soll.",
      "allow-role-property": "Eigenschaft erlauben / verbieten",
      "allow-role-property-desc": "Wollen Sie eine Eigenschaft erlauben oder verbieten?",
      "allow-role-propertyType": "Eigenschaftstype",
      "allow-role-propertyType-desc": "Geben Sie an, ob die Eigenschaft eine Liste oder ein normaler Eintrag ist.",
      "bc-address": "BC ENS-Adresse",
      "check-role-func": "Berechtigungsprüfung",
      "check-role-func-desc": "Geben Sie den Funktionsnamen an, der geprüft werden soll. (z.B.: setEntry(bytes32,bytes32))",
      "choose-bc": "Business Center auswählen",
      "choose-bc-desc": "Wenn der Vertrag in einem Business Center ist, geben Sie bitte dessen Adresse im nachfolgenden Feld ein. Wenn nicht, lassen sie das Feld leer.",
      "consumer-state": "Mitgliedsstatus",
      "contract-invitation": {
        "text-body": "Sie wurden in den folgende Vertrag eingeladen {{ contractadress }}. Aktivieren Sie den Anhang dieser Mail, um die Einladung anzunehmen.",
        "text-title": "Vertragseinladung"
      },
      "contract-my-state-changed": "Mein Vertragsstatus wurde erfolgreich geändert.",
      "contract-state": "Vertragsstatus",
      "contract-state-changed": "Vertragsstatus wurde erfolgreich geändert.",
      "contract-states": {
        "0": "Initial",
        "1": "Fehler",
        "2": "Entwurf",
        "3": "ausstehende Genehmigung",
        "4": "Geprüft",
        "5": "Aktiv",
        "6": "Verifiziert abgeschlossen",
        "7": "Abgeschlossen",
        "loading": "Aktualisieren...",
        "undefined": "Unbekannt"
      },
      "deny": "Verbieten",
      "empty-role-add": "Keine Rolle ausgewählt",
      "empty-role-add-desc": "Bitte wählen Sie eine Rolle aus.",
      "entry": "\"entry\"",
      "func": "Funktion",
      "has-permissions": {
        "false": "Keine der Rollen [ {{ role }} ] HAT RECHTE auf die Funktion {{ input }} mit der Signatur {{ signature }}.",
        "title": "Rechteüberprüfung",
        "true": "Eine der Rollen [ {{ role }} ] HAT RECHTE auf die Funktion {{ input }} mit der Signatur {{ signature }}."
      },
      "invite-member": "Neue Mitglieder einladen",
      "listentry": "\"list\"",
      "member": "Mitglied",
      "members": "Mitglieder",
      "my-state": "Mein Status",
      "my-states": {
        "0": "Initial",
        "1": "Fehler",
        "2": "Entwurf",
        "3": "Abgelehnt",
        "4": "Aktiv",
        "5": "Abgeschlossen",
        "loading": "Aktualisieren...",
        "undefined": "Unbekannt"
      },
      "new-ownership": "AccountId",
      "no-permission": "Sie haben keine Rechte um diese Daten zu ändern oder etwas hinzuzufügen.",
      "ownership-transfered": "Besitzerrechte wurde erfolgreich übertragen",
      "permissions": "Berechtigungen",
      "permitted-properties": "Berechtigte Eigenschaften / Funktionen",
      "public-property": "Öffentliche Eigenschaften / Funktionen (constant)",
      "remove": "\"remove\"",
      "remove-role": "Rolle entfernen",
      "remove-role-desc": "Durch das Entfernen der letzten Rolle eines Nutzers wird er gleichzeitig als Mitglied des Vertrags gelöscht. Beachten Sie: Das entfernen des Nutzers aus dem Vertag ermöglicht nicht, dass dieser die Rechte auf bisher geteilte Daten verliert.",
      "role": "Rolle",
      "role-func-sig": "Funktion",
      "role-property-sig": "Eigenschaft",
      "role-successfully-added": "Rolle wurde erfolgreich hinzugefügt",
      "role-successfully-removed": "Rolle wurde erfolgreich entfernt",
      "roles": "Rollen",
      "roles-abi-members": "ABI",
      "set": "\"set\"",
      "set-contract-state": "Vertragsstatus setzen",
      "set-my-contract-state": "Meinen Vertragsstatus setzen",
      "set-operation-func": "Eigenschaft setzen erlauben / verbieten",
      "set-role-func": "Funktion erlauben / verbieten",
      "set-role-func-desc": "Geben Sie den Funktionsnamen die für diese Rolle freigegeben werden soll.\n\nz.B.: setEntry(bytes32,bytes32)",
      "set-role-property": "Eigenschaft erlauben",
      "set-role-property-desc": "Geben Sie den Eigenschaftsnamen die für diese Rolle freigegeben werden soll.\n\nz.B.: CustomEntry",
      "setted-role-func": "Funktion wurde erfolgreich freigeschaltet.",
      "setted-role-property": "Eigenschaft wurde erfolgreich freigeschaltet.",
      "signature": "Signatur",
      "successfully-invited": "Die Nutzer wurden erfolgreich hinzugefügt.",
      "transfer": "Übertragen",
      "transfer-ownership": "Besitzerrechte übertragen",
      "transfer-ownership-question": "Wollen Sie wirklich die Besitzerrechte an einen anderen Nutzer abtreten?"
    },
    "cancel": "Abbrechen",
    "change-id": "Adresse ändern",
    "choose-abi-contracts": "ABI auswählen",
    "choose-abi-contracts-desc": "Versuchen Sie eine ABI Definition von bestehenden evan.network Verträgen zu laden und den Vertrag über dieses Interface anzuschauen.",
    "configuration": "Konfiguration",
    "contract-address": "Vertragsadresse",
    "contract-ens-ipfs": "Vertragsadresse / ENS-Adresse",
    "contract-type": "Vertragstyp",
    "created": "Erstellt",
    "data-schema": "Datenschema",
    "data-schema-desc": "Datenschema um Nutzdaten von Verträgen aufzuarbeiten und darzustellen.",
    "datacontract": {
      "add-custom-entries": "Sie können Eigenschaften hinzu fügen, die nicht im Datenschema aufgeführt sind. (z.B.: todos, todologs)",
      "add-list-entry": "Listeneintrag hinzufügen",
      "add-list-entry-question": "Wollen Sie die aktuellen Daten speichern?",
      "data": "Daten",
      "data-analysis": "Datenanalyse",
      "data-schema": "Datenschema",
      "encrypt-hashes": "Entschlüsseln / Verschlüsseln",
      "encrypt-hashes-desc": "Verschlüsselt und entschlüsselt automatisch alle Einträge und Hashes.",
      "encryption": "Verschlüsselungsalgorithmus",
      "entries": "Entry",
      "entry-name": "Name des Eintrags",
      "entry-types": {
        "entry": "Eintrag",
        "list": "Liste"
      },
      "entry-updated": "Der Eintrag wurde erfolgreich gespeichert.",
      "explore-custom": "Anderen Eintrag überprüfen",
      "format-list-entry-json": "Datenintegrität",
      "format-list-entry-json-question": "Es scheint, als wöllten Sie JSON Daten speichern, welche keinem validen JSON Format entsprechen. Wollen Sie Trotzdem fortfahren?",
      "general": "Generelle Informationen",
      "invalid-entry-update": "Ein Fehler ist aufgetreten",
      "invalid-entry-update-desc": "Die Daten konnten nicht gespeichert werden. Bitte prüfen Sie, ob eine Ihrer zugewiesenen Rollen berechtigt ist, diesen Eintrag zu setzen / zu entfernen.",
      "listentry": "Listeneintrag: ",
      "listentry-added": "Listeneintrag wurde erfolgreich hinzugefügt.",
      "listentry-removed": "Listeneintrag wurde erfolgreich entfernt",
      "no-data-found": "Keine Daten für den Eintrag wurden gefunden: ",
      "no-entries": "Keine Einträge vorhanden. Wenn Sie weitere kennen, lassen sich diese über den \"Anderen Eintrag prüfen\" auswählen.",
      "no-entry-selected": "Es wurde kein Dateneintrag ausgewählt. Bitte wählen Sie einen Dateneintrag aus.",
      "property": "Eigenschaft",
      "remove-listentry": "Eintrag entfernen",
      "remove-listentry-question": "Dadurch wird der gesamte Datensatz aus der Liste entfernt und kann nicht wiederhergestellt werden. Wollen Sie fortfahren?",
      "required": "Erforderlich",
      "set-entry": "Eintrag speichern",
      "set-entry-not-allowed": "Sie sind nicht berechtigt diese Daten zu speichern.",
      "start-explorer-custom": "Überprüfen",
      "type": "Type",
      "update-entry": "Eintrag speichern",
      "update-entry-question": "Wollen Sie die aktuellen Daten speichern?",
      "use-configuration": "Konfiguration nutzen",
      "use-dfs-storage": "DFS-Speicher nutzen",
      "use-dfs-storage-desc": "Lädt und speichert Daten als Hashes vom / im IPFS (für die Speicherung großer Datenmengen erforderlich).",
      "value": "Wert"
    },
    "dbcp": {
      "active-version": "Aktive Version",
      "add-lang-key": "Übersetzung hinzufügen",
      "add-lang-key-desc": "Sprachkürzel finden Sie hier: https://www.science.co.il/language/Locale-codes.php",
      "add-version": "Version hinzufügen",
      "add-version-desc": "Bitte geben Sie den Versions-Key ein. Generell setzen sich Versionen immer aus 3 Nummern (Major, Minor, Snapshot), getrennt mit Punkten zusammen: z.B. 1.0.0 .",
      "author": "Autor",
      "dapp": "DApp",
      "dapp-type": "DApp Typ",
      "dbcp-for-address": "DBCP für Adresse",
      "dbcp-update": "DBCP Update",
      "dbcp-version": "DBCP Schema Version",
      "description": "Beschreibung",
      "entrypoint": "Einstiegsdatei",
      "files": "Dateien",
      "general": "Generell",
      "i18n": "I18N",
      "i18n-description": "Übersetzungen: Beschreibung",
      "i18n-name": "Übersetzungen: Name",
      "img-square": "Bild quadratisch",
      "img-wide": "Bild querformat",
      "invalid-dbcp": "Ungültige DBCP Definition",
      "invalid-dbcp-desc": "Die eingebenen Daten entsprechen keinem gültigen JSON Format. Bitte korrigieren Sie das Format.",
      "invalid-lang-key": "Ungültiger Sprachkürzel",
      "invalid-lang-key-desc": "Bitte egeben sie einen Sprachkürzel ein.",
      "invalid-version-key": "Ungültiger Version",
      "invalid-version-key-desc": "Eine ungültige Version wurde eingegeben. Generell setzen sich Versionen immer aus 3 Nummern (Major, Minor, Snapshot), getrennt mit Punkten zusammen: z.B. 1.0.0 .",
      "ipfs-origin": "IPFS Ordner",
      "lang-key": "Sprachkürzel",
      "lang-key-exists": "Ungültiger Sprachkürzel",
      "lang-key-exists-desc": "Sprachkürzel existiert bereits.",
      "name": "Name",
      "params-missing": "Werte für Felder fehlen: ",
      "primary-color": "Primärfarbe",
      "secondary-color": "Sekundärfarbe",
      "standalone": "Fullscreen / Integriert",
      "tags": "Tags",
      "translation": "Übersetzung",
      "update-dbcp": "Aktuelle Daten speichern",
      "update-dbcp-not-allowed": "Sie haben nicht die benötigten Rechte, die DBCP Konfiguration dieser Adresse zu aktualisieren.",
      "update-question": "DBCP Update",
      "update-question-desc": "Wollen sie die aktuellen Daten wirklich speichern?<br>Änderungen an diesen Informationen können das Verhalten der zugehörigen Anwendung ändern oder gar unbrauchbar machen.",
      "updated-fail": "DBCP Update fehlgeschlagen",
      "updated-successfully": "DBCP erfolgreich aktualisiert",
      "value-integrated": "Integriert",
      "value-standalone": "Fullscreen",
      "version": "Version",
      "version-already-exists": "Ungültige Version",
      "version-already-exists-desc": "Die angegebene Version ist bereits vergeben.",
      "version-key": "Versions-Key"
    },
    "details": "Rubriken",
    "enable-time-travel": "spezifischen Block benutzen",
    "explore-desc": "Bitte geben Sie eine<br><b>Vertragsadresse oder eine ENS Adresse ein </b>",
    "explore-id": "Öffnen",
    "explorer": "Explorer",
    "general-infos": "Generelle Informationen",
    "general-infos-desc": "ID, Transaktionsstatus, ...",
    "generic-error": "Fehler",
    "generic-error-desc": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    "history": {
      "address": "Hash",
      "amount": "EVE",
      "block": "Block",
      "block-batch-count": "Anzahl der zu ladenden Blöcken",
      "block-batch-count-desc": "Beim Benutzen dieser Option werden X Blöcke analysiert.",
      "blockHash": "BlockHash",
      "blockNumber": "BlockNumber",
      "blocks": "analysierte Blöcke",
      "chainId": "ChainID",
      "condition": "Condition",
      "creates": "Creates",
      "eve-price": "EVE Preis",
      "from": "Von",
      "function": "Funktion",
      "gas": "Gas",
      "gasPrice": "GasPrice",
      "hash": "Hash",
      "input": "Input",
      "load-more": "mehr laden",
      "nonce": "Nonce",
      "publicKey": "PublicKey",
      "r": "r",
      "raw": "Raw",
      "s": "s",
      "signature": "Signatur",
      "standardV": "standardV",
      "stop-loading": "Laden unterbrechen",
      "to": "to",
      "transaction-load-count": "Anzahl der zu ladenden Transaktionen",
      "transaction-load-count-desc": "Beim Benutzen dieser Option werden so viele Blöcke geladen, bis X Transaktionen gefunden wurden.",
      "transactionIndex": "TransactionIndex",
      "transactions": "Transaktionen",
      "v": "v",
      "value": "Value"
    },
    "id": "ID",
    "interaction": {
      "abi-missing": "Keine ABI Definition gefunden",
      "abi-missing-desc": "Bitte verwenden Sie eine valide ABI Definition. Diese lässt sich über den Konfigurationsdialog im oberen Bereich des Bildschirms anpassen.",
      "constant-false": "Transaktion ausführen",
      "constant-true": "Abfrage ausführen",
      "inputs": "Eingabeparameter",
      "invalid-input-array": "Ungültige Eingabeparameter",
      "invalid-input-array-desc": "Die Eingabeparameter sollten ein gültiges Array darstellen, wobei jeder Index einen Eingabeparameter repräsentiert.",
      "result": "Ergebnis"
    },
    "invalid": "Ungültige Vertragsadresse / ENS-Adresse",
    "invalid-abi": "Ungütlige ABI",
    "invalid-abi-desc": "Bitte geben Sie eine gültige ABI-Beschreibung an. Es handelt sich in der Regel um ein serialisiertes JSON-Array.",
    "invalid-desc": "Bitte geben Sie eine valide Vertragsadresse / ENS-Adresse ein.",
    "ok": "Ok",
    "open-dapp": "DApp öffnen",
    "opened-address": "Geöffnete Adresse",
    "owner": "Ersteller",
    "raw-mode": "Raw-Mode",
    "raw-mode-desc": "Zeigt die Originaldaten als JSON und keine UI Verbesserungen werden dargestellt.",
    "section": {
      "basecontract": "evan.network BaseContract",
      "basecontract-desc": "Vertragsstatus, -mitglieder und mehr",
      "verifications": "Zertifikate",
      "verifications-desc": "Prüfen Sie Zertifikate für die ausgewählte Adresse.",
      "contractinteraction": "Vertragsinteraktion",
      "contractinteraction-desc": "ABI Funktionen direkt ausführen",
      "datacontract": "evan.network DataContract",
      "datacontract-desc": "Listen, Mappings und mehr",
      "datacontract-detail": "evan.network DataContract",
      "dbcp": "DBCP",
      "dbcp-desc": "DBCP Informationen",
      "general": "Generelle Informationen",
      "transactionhistory": "Transaktionshistorie",
      "transactionhistory-desc": "Ansicht der Vertragstransaktionen"
    },
    "time-travel": "Block",
    "time-travel-desc": "Durch das Einschalten dieser Option werden alle Informationen zu bis zu einem bestimmten, konfigurierten Block geladen.",
    "use-configuration": "Konfiguration benutzen",
    "version": "Versionsinformationen"
  },
  "explorer": "Explorer"
};
