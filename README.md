# Webshop with ReactJS and FireBase

## Punkte
Meine Punkteverteilung und dessen Begründung
### Basispaket - 20 Punkte
Alle Kategorien sind vorhanden. Es gibt mehrere Mietobjekte, welche alle genau beschrieben sind. Kontaktdaten sind auf der Über uns Seite. Das Template ist sehr einheitlich, da es immer die gleiche Mapping Funktion ist
### Deployment - 5 Punkte
Hier ist auch alles erreicht. Die Versionsverwaltung ist auf GitHub und das Deployment auf der vorgestellten Seite
### Erweiterung - 1 Punkt
Dieses Ziel habe ich teilweise erreicht, da ich eine Karte zu jedem Objekt habe.
### Vermietung - 13 Punkte
Hier ist alles umgesetzt worden. Es gibt einen Date picker um zu mieten, die Preise sind drauf und die Datenbankanbindung Firebase funktioniert einwandfrei. In das Design ist auch sehr viel Zeit eingeflossen. Es wurden Frameworks so wie komplexe CSS queries verwendet und zu erreichen was erreicht wurde. Hier fehlt aber, dass man sieht wann bereits vermietet wurde.
### Erweiterung Vermietung - 5 Punkte
Hier wurde auch wieder alles umgesetzt. Man hat eine Preisberechnung, zusätze und so weiter. Die offerten werden sehr Umfangreich an Inhalt gespeichert.
### Benutzerverwaltung - 15 Punkte
Hier wurde auch alles umgesetzt. Man kann einen Account erstellen und sich anmelden. Captcha wird automatisch von Firebase im Backend übernommen. Man kann ohne einen Account nicht reservieren und die Anbindung an die Datenbank funktioniert.
### Security - 10 Punkte
#### Sicherheits-Risiko-Analyse
Nach einer langen Recherche ergab sich, dass Firebase die meiste Sicherheit übernimmt. Das captcha als Beispiel wird von Google automatisch im Backend übernommen. Risiken gibt es nicht viele in meinen Regeln. Die Reservationen können von allen gelesen werden, doch schreiben kann nur ein nutzer mit verifizierter Email sie. Die Account Daten lesen und Schreiben kann man nur eingeloggt. Und dann auch nur seine eigenen. Das wird alles mit firebase gemacht. Es kann uneingeloggt und unregistriert weder geschrieben noch gelesen werden. Ich sehe fast keine Risiken. Das einzige Risiko was ich sehe, ist dass der User auch bestehende Mietobjekte verändern kann. Das ist umbedingt nötig, sodass der User Mieten vornehmen kann, doch es kann missbraucht werden.
#### Meine Erklärung
Ich denke, dass die Software Sicherheit für so ein kleineres Projekt ausreicht. Die sensiblen Userdaten sind ohnehin alle gesichert, da nur der user seine eigenen Daten schreiben kann. Alle Massnahmen wurden in Firebase rules geschrieben.

## Im gesamten - 69 Punkte
Im ganzen habe ich meiner Meinung nach 69 Punkte erreicht. Es ist noch Platz nach unten, sodass ich mir kleine Abzüge erlauben kann, um immernoch auf die Sechs zu kommen