<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <xsl:result-document href="html/index.html">
            <html>
                <head>
                    <title>Arqueossítios do Nordeste de Portugal</title>
                    <meta charset="UTF8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h1>Arqueossítios do Nordeste de Portugal</h1>
                    <h3>Índice de Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arqelem-{generate-id()}.html">
                <b><xsl:value-of select="IDENTI"/></b> - <xsl:value-of select="FREGUE"
                    />,<xsl:value-of select="CONCEL"/>
            </a>

        </li>
    </xsl:template>
    <xsl:template match="ARQELEM">
        <xsl:result-document href="html/arqelem-{generate-id()}.html">
            <html>
                <head>
                    <title>Arqueossítios do Nordeste de Portugal: Página de Arqueossítio</title>
                    <meta charset="UTF8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <table class="w3-table">
                        <tr>
                            <th>Tipo<td><xsl:value-of select="TIPO"/></td></th>
                        </tr>
                        <tr>
                            <th>Identificação<td><xsl:value-of select="IDENTI"/></td></th>
                        </tr>
                        <tr>
                            <th>Descrição<td><xsl:value-of select="DESCRI"/></td></th>
                        </tr>
                        <tr>
                            <th>Lugar<td><xsl:value-of select="DESCRI"/></td></th>
                        </tr>
                        <tr>
                            <th>Freguesia<td><xsl:value-of select="FREGUE"/></td></th>
                        </tr>
                        <tr>
                            <th>Concelho<td><xsl:value-of select="CONCEL"/></td></th>
                        </tr>
                        <tr>
                            <th>CODADM<td><xsl:value-of select="CODADM"/></td></th>
                        </tr>
                        <tr>
                            <th>Latitude<td><xsl:value-of select="LATITU"/></td></th>
                        </tr>
                        <tr>
                            <th>Longitude<td><xsl:value-of select="LONGIT"/></td></th>
                        </tr>
                        <tr>
                            <th>Altitude<td><xsl:value-of select="ALTITU"/></td></th>
                        </tr>
                        <tr>
                            <th>Acesso<td><xsl:value-of select="ACESSO"/></td></th>
                        </tr>
                        <tr>
                            <th>Quadro<td><xsl:value-of select="QUADRO"/></td></th>
                        </tr>
                    </table>
                    <hr/>
                    <address>
                        <a href="index.html#{generate-id()}">Voltar à página inicial</a>
                    </address>
                </body>
            </html>
        </xsl:result-document>

    </xsl:template>
</xsl:stylesheet>
