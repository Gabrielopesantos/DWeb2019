<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">

    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Project Record - TPC3</title>
                <meta charset="UTF8"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </head>
            <body>
                <h1 align="center">Project Record</h1>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="metadata">
        <hr/>
        <table class="w3-table">
            <tr>
                <th>Keyname:</th>
                <td>
                    <xsl:value-of select="keyname"/>
                </td>
                <th>Begin Date:</th>
                <td>
                    <xsl:value-of select="bdate"/>
                </td>
            </tr>
            <tr>
                <th>Title:</th>
                <td>
                    <xsl:value-of select="title"/>
                </td>
                <th>End Date:</th>
                <td>
                    <xsl:value-of select="edate"/>
                </td>
            </tr>
            <tr>
                <th>Subtitle:</th>
                <td>
                    <xsl:value-of select="subtitle"/>
                </td>
                <th>Supervisor:</th>
                <td>
                    <a href="{supervisor/@homepage}">
                        <xsl:value-of select="supervisor"/>
                    </a>
                </td>
            </tr>
        </table>
        <hr/>
    </xsl:template>
    <xsl:template match="member">
        <hr/>
        <h4>
            <b>WorkTeam</b>
        </h4>
        <ol>
            <li>
                <xsl:value-of select="identifier"/> - <xsl:value-of select="name"/> - <xsl:value-of
                    select="email"/> - <xsl:value-of select="git"/>
            </li>
        </ol>
        <hr/>
    </xsl:template>
    <xsl:template match="abstract">
        <hr/>
        <h4>
            <b>Abstract</b>
        </h4>
        <xsl:apply-templates select="p"/>
        <hr/>
    </xsl:template>
    <xsl:template match="deliverables">
        <hr/>
        <h4>
            <b>Deliverables</b>
        </h4>
        <ul>

            <xsl:apply-templates select="deliverable"/>

        </ul>
        <hr/>
    </xsl:template>
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}">
                <xsl:value-of select="."/>
            </a>
        </li>
    </xsl:template>
    <xsl:template match="p">
        <p>

            <xsl:value-of select="."/>

        </p>
    </xsl:template>
</xsl:stylesheet>
