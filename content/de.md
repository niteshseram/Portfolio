## Sind Sie mit dem Stylen von SVG vertraut?

Es gibt mehrere Möglichkeiten, Formen einzufärben (einschließlich der Angabe von Attributen für das Objekt), indem Sie Inline-CSS, einen eingebetteten CSS-Abschnitt oder eine externe CSS-Datei verwenden. Die meisten SVGs, die Sie im Web finden, verwenden Inline-CSS, aber jeder Typ hat seine Vor- und Nachteile.

Die grundlegende Farbgebung kann durch Festlegen von zwei Attributen für den Knoten erfolgen: `fill` und `stroke`. `fill` legt die Farbe innerhalb des Objekts fest und `stroke` legt die Farbe der um das Objekt gezeichneten Linie fest. Sie können dieselben CSS-Farbbenennungsschemata verwenden wie in HTML, ob es sich nun um Farbnamen (das ist `red`), RGB-Werte (das ist `rgb(255,0,0)`), Hex-Werte, RGBA-Werte usw. handelt.

```html
<rect
  x="10"
  y="10"
  width="100"
  height="100"
  stroke="blue"
  fill="purple"
  fill-opacity="0.5"
  stroke-opacity="0.8" />
```

Das obige `fill="purple"` ist ein Beispiel für ein _Präsentationsattribut_. Interessanterweise und anders als Inline-Styles wie `style="fill: purple"`, das zufällig auch ein Attribut ist, können Präsentationsattribute durch CSS-Styles überschrieben werden, die in einem Stylesheet definiert sind. Wenn Sie also etwas wie `svg { fill: blue; }` tun, wird dies die definierte violette Füllung überschreiben.
