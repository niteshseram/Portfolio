--- 
"title": 'ESLint, Prettier und Husky mit lint-staged für Ihr Next.js-Projekt einrichten' 
"publishedAt": '2021-09-26' 
"summary": 'Dies ist eine Schritt-für-Schritt-Anleitung für die erforderlichen Schritte zum Einrichten von ESLint, Prettier und Husky mit lint-staged für ein Next.js-Projekt' 
"image": /images/blog/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/banner.png 
--- 

<Image
	alt='Blog Banner'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/banner.png'
	width={2240 / 2}
	height={1260 / 2}
	priority
/> 

### Einführung 

Dieser Blog führt Sie durch alle Schritte zum Einrichten von ESLint, Prettier und Husky mit lint-staged für Ihr Next.js-Projekt. 

Bevor wir beginnen, sollten wir verstehen, was ESLlint, Prettier, Husky und lint-staged sind. [ESLint](https://eslint.org/) ist ein Tool, das Ihren Javascript-Code während des Schreibens prüft, um etwaige Probleme oder Bugs in Ihrem Code zu identifizieren und zu melden. [Prettier](https://prettier.io/) wird verwendet, um alle Probleme im Zusammenhang mit dem Styling zu scannen und Ihren Code automatisch umzugestalten, um sicherzustellen, dass in Ihrem gesamten Code konsistente Regeln eingehalten werden, z. B. ob im gesamten Code ein Semikolon am Ende einer Anweisung verwendet werden darf oder nicht. [Husky](https://github.com/typicode/husky) ist ein Tool, mit dem wir [Git-Hooks](https://git-scm.com/docs/githooks) einfach handhaben und die gewünschten Skripte in diesen Phasen ausführen können. Einfach ausgedrückt ist Husky ein Tool, mit dem Sie einige Skripte vor Ihren Git-Commits ausführen können, z. B. ein Linting-Skript, um Ihren Code vor dem Git-Commit auf Probleme zu prüfen. [lint-staged](https://github.com/okonet/lint-staged) ermöglicht es Ihnen, Linter nur für die bereitgestellten Git-Dateien und nicht für alle Codedateien auszuführen. 

### Einrichten des Projekts 

Wenn Sie dies nicht in Ihrem Next.js-Projekt ausprobieren möchten, erstellen wir ein Next.js-Projekt, indem wir den folgenden Befehl in dem Verzeichnis ausführen, in dem Sie Ihr Projekt erstellen möchten. 

```bash
npx create-next-app nextjs-linting-project
# or
yarn create next-app nextjs-linting-project
``` 

Sie können `nextjs-linting-project` gerne durch einen beliebigen Projektnamen ersetzen. 
Dadurch wird ein Ordner mit dem Namen `nextjs-linting-project` erstellt. Sobald dies erledigt ist, navigieren Sie in diesen Ordner und wir können loslegen! 

[Folgen Sie den Git-Commits](https://github.com/niteshseram/nextjs-linting-project/commit/498b1419459f0c79d2850956cc360bd77f57ebc4) 

### Einrichten von ESLint 

Seit Version 11.0.0 bietet Next.js eine sofort einsatzbereite ESLint-Integration. Um diese einzurichten, fügen Sie das Skript `"lint": "next lint"` in das Skriptobjekt Ihrer [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/498b1419459f0c79d2850956cc360bd77f57ebc4/package.json#L9)-Datei ein. 

Führen Sie nun den Befehl `yarn lint` oder `npm run lint` in Ihrem Terminal aus und es werden Ihnen zwei Optionen **Strict** und **Base** angezeigt. 

Wählen Sie **Strict**, wenn Sie eine Next.js-Basis-ESLint-Konfiguration mit einem strengeren Core Web Vitals-Regelsatz wünschen. Dies ist eine von Next.js empfohlene Option, aber für dieses Tutorial wählen Sie die Option **Strict** nur, wenn Sie mit Core Web Vitals arbeiten. Andernfalls wählen Sie **Base**, die grundlegende ESLint-Konfiguration, die mit Next.js geliefert wird. Sobald Sie eine der Optionen auswählen, werden `eslint` und `eslint-config-next` installiert und automatisch die Datei `.eslintrc.json` hinzugefügt, die die Konfigurationsdatei für ESLint ist. 

Führen Sie nun den Befehl `yarn lint` erneut in Ihrem Terminal aus und dieses Mal wird eine Warnung wie im folgenden Bild angezeigt. 

<Image
	alt='ESLint Warning Picture'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/1.PNG'
	width={1123}
	height={199}
/> 

Ich werde nicht näher darauf eingehen, wie man diese Warnungen entfernt. Sie können die Warnung überprüfen, indem Sie mit der Maus über den Code fahren und dem im Popup angezeigten Link folgen. 

Jetzt können wir sehen, dass unser Linting funktioniert, aber wir sind noch nicht fertig. Dieses Linting überprüft nur einige der von Next.js festgelegten Basisregeln. Aber wir möchten unseren Code sauberer machen, indem er eine Warnung anzeigt, wenn wir eine Variable deklarieren und nicht verwenden. Dieses Problem wird also nicht von unserem aktuellen ESLint erkannt. 

Sie können es versuchen, indem Sie zu `pages/index.js` gehen und alle Variablen deklarieren oder etwas importieren, das Sie in dieser Datei nicht verwenden. Dann werden Sie sehen, dass im Code-Editor kein Fehler auftritt und auch nicht in der Konsole angezeigt wird, wenn Sie `yarn lint` ausführen, wie in den folgenden Bildern gezeigt. 

<Image
	alt='ESLint in Code Editor'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/2.PNG'
	width={994}
	height={563}
/> 
Im obigen Bild können Sie sehen, dass eine Variable `abc` deklariert, aber nirgendwo 
in dieser Datei verwendet wird. Aber die Variable `abc` ist nicht unterstrichen, was bedeutet, dass kein Problem gefunden wurde. 
<Image
	alt='ESLint in Console'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/1.PNG'
	width={1123}
	height={199}
/> 

Im obigen Bild bezieht sich die Warnung in der Konsole auf Dateien im Verzeichnis `api` und nicht auf die Datei `pages/index.js`. Es wird also nicht von ESLint abgefangen. 

Um also weitere Regeln zu Ihrem bestehenden ESLint hinzuzufügen, müssen Sie `eslint:recommended` in Ihrer [`.eslintrc.json`](https://github.com/niteshseram/nextjs-linting-project/blob/290db372928963f3b3aa094e80c9b533299401b2/.eslintrc.json#L2)-Datei wie unten erweitern. 

```json title="eslintrc.json"
{
  "extends": ["eslint:recommended","next"]
}
``` 

`eslint:recommended` Fügen Sie Ihrer bestehenden ESLint-Konfiguration weitere Regeln hinzu. Jetzt würden Sie in Ihrem Code-Editor eine Warnung sehen, wenn Sie die Variablen deklariert oder etwas importiert und nicht verwendet haben. Sie können auch den Befehl yarn lint ausführen und jetzt sollte Ihnen die Warnung auch in Ihrer Konsole angezeigt werden, wie Sie im folgenden Bild sehen können. 

<Image
	alt='ESLint in VS Code'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/3.PNG'
	width={1032}
	height={555}
/> 
Im obigen Bild können Sie sehen, dass die Variable `abc` jetzt unterstrichen ist und von ESLint abgefangen wird. 
<Image
	alt='ESLint in Console'
	src='/images/setting-up-eslint-prettier-and-husky-with-lint-staged-for-your-nextjs-project/4.PNG'
	width={1110}
	height={312}
/> 
Im obigen Bild ist eine Warnung bezüglich der nicht verwendeten Variable `abc` zu sehen. 

**Hinweis:** Standardmäßig führt Next.js ESLint für alle Dateien in den Verzeichnissen `pages/`, `components/` und `lib/` aus. 

Wenn Sie versuchen, eine Datei in einem anderen Verzeichnis als diesen zu erstellen, wird möglicherweise die Warnung oder das Problem im Code-Editor angezeigt, aber es wird beim Ausführen des Befehls `yarn lint` nicht abgefangen. 

Wenn Sie ESLint auch in anderen Verzeichnissen wie `abc` ausführen möchten, erstellen Sie eine [`next.config.js`](https://github.com/niteshseram/nextjs-linting-project/blob/b70b2a0fa1af16cf6da495acdc9d50a60462aa56/next.config.js)-Datei in Ihrem Stammverzeichnis und fügen Sie den folgenden Code in diese Datei ein. 

```js title="next.config.js"
module.exports = {
  eslint: {
    dirs: ['pages', 'components', 'lib','abc'],
  },
}
``` 

Wie Sie sehen, haben wir das Verzeichnis abc zur Liste hinzugefügt, wodurch ESLint auf diesen Dateien ausgeführt und im Verzeichnis abc angezeigt werden kann. 

### Prettier einrichten 

Um Prettier einzurichten, installieren wir prettier und eslint-config-prettier, indem wir den folgenden Befehl ausführen. 

```bash
yarn add -D prettier eslint-config-prettier
or
npm i --save-dev prettier eslint-config-prettier
``` 

`eslint-config-prettier` wird verwendet, um den Konflikt zwischen ESLint und Prettier zu lösen, da ESLint auch einige Codeformatierungsregeln enthält. 

Sobald Sie diese installiert haben, erstellen Sie eine [`.prettierrc.json`](https://github.com/niteshseram/nextjs-linting-project/blob/fed364b39693ae0abf45c6976a386a01b4d924af/.prettierrc.json)-Datei und fügen Sie die folgenden Regeln in die Datei ein. 

```json title=".prettierrc.json"
{
	"endOfLine": "lf",
	"printWidth": 80,
	"trailingComma": "es5",
	"semi": false,
	"jsxSingleQuote": true,
	"singleQuote": true,
	"useTabs": true,
	"tabWidth": 2,
	"arrowParens": "always"
}
``` 

Sie können die Datei gerne Ihren Anforderungen entsprechend ändern. Es gibt weitere [Regeln](https://prettier.io/docs/en/options.html), wenn Sie welche hinzufügen möchten. 

Fügen Sie nach dieser Konfiguration Prettier zu Ihrer [`.eslintrc.json`](https://github.com/niteshseram/nextjs-linting-project/blob/fed364b39693ae0abf45c6976a386a01b4d924af/.eslintrc.json#L2)-Datei hinzu, wie unten. 

```json title=".eslintrc.json"
{
	"extends": ["eslint:recommended", "next", "prettier"]
}
``` 

Sobald Sie mit diesen Schritten fertig sind, sind Sie auch mit Prettier bereit. Es formatiert Ihren Code automatisch, wenn Sie ihn speichern, sofern Sie die Option `Format On Save` in Ihrem VS Code-Editor aktiviert haben. 

Wenn Sie jedoch alle Ihre Dateien durch Ausführen eines Befehls formatieren möchten, fügen Sie ein Skript `"format": "prettier --write ."` innerhalb des Skriptobjekts in Ihrer Datei [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/23cc3e506fdce610220ea54b605cba323ab6a3c5/package.json#L10) hinzu. 

Führen Sie anschließend `yarn format` oder `npm run format` aus, um alle Ihre Codes zu formatieren. 

Nun sind wir mit Prettier zufrieden. Aber wir möchten alle diese Formatierungs- und Linting-Skripte automatisch ausführen, wenn wir ein Git-Commit durchführen. Dann gibt es Husky, das diese Art von Dingen erledigen kann. 

### Einrichten von Husky mit lint-staged 

Lassen Sie uns Husky und lint-staged installieren, indem wir den folgenden Befehl ausführen. 

```bash
yarn add -D husky lint-staged
# or
npm i --save-dev husky lint-staged
``` 

Wenn Sie mit der Installation fertig sind, fügen Sie ein Skript `"prepare": "husky install"` in das Skriptobjekt Ihrer [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/33deffaa7a2e88540b5d583d7614458802f26b66/package.json#L11)-Datei ein. Führen Sie dann den Befehl `yarn prepare` oder `npm run prepare` aus, der einige Skripte zum Ausführen von Git-Hooks installiert. 

Fügen Sie dann erneut in der Datei [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/411c201baeade8f51900e95d32ddf099db1587f8/package.json#L14-L21) das unten angegebene neue Objekt hinzu. 

```json title="package.json"
"lint-staged": {
		"*.js": [
			"eslint --fix"
		],
		"*.{html,js}": [
			"prettier --write"
		]
	}
``` 

Dieses `lint-staged`-Objekt führt ESLint und Prettier nur für die Dateien aus, die git-staged sind. Aber warten Sie mal, warum wird im obigen `lint-staged`-Skript `eslint --fix` statt `next lint` ausgeführt? Der Grund ist, dass Next.js ein [Problem](https://github.com/vercel/next.js/issues/27997) hat, Next Lint mit lint-staged auszuführen, und hoffentlich wird es bald behoben. Sie können also vorerst `eslint --fix` verwenden. 

Fügen Sie dann ein Skript `"precommit": "lint-staged"` in das Skriptobjekt Ihres [`package.json`](https://github.com/niteshseram/nextjs-linting-project/blob/411c201baeade8f51900e95d32ddf099db1587f8/package.json#L12) ein, mit dem Sie das `lint-staged`-Objekt als Skript ausführen können, indem Sie `yarn precommit` oder `npm run precommit` ausführen. 

Sie sind fast am Ziel. Führen Sie nun diesen Befehl `npx husky add .husky/pre-commit "npm run precommit"` aus, um einen Pre-Commit-Hook hinzuzufügen, der den Befehl `npm run precommit` jedes Mal ausführt, wenn Sie ein Git-Commit durchführen. Dadurch wird verhindert, dass unformatierter oder linting-Problemcode in Ihr Github-Repository übertragen wird. 

Juhu! Wir sind fertig.🎉 
