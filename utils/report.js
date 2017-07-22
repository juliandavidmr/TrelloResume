var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as Trello from './trello'

export function generatePDF(dataTrello) {
  const name = Trello.name(dataTrello);
  const cards = Trello.cards(dataTrello);
  const checklists = Trello.checklists(dataTrello);
  const users = Trello.members(dataTrello);

  var docDefinition = {
    content: [{
        text: name,
        style: 'header',
        alignment: 'center'
      },
      'Resumen total del tablero "' + name + '"',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Actividades', 'Listas de chequeo', 'Miembros'],
            [cards.length, checklists.length, users.length]
          ]
        }
      },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Actividades', 'Listas de chequeo', 'Miembros'],
            [cards.length, checklists.length, users.length]
          ]
        }
      }, 'Numbered list example:',
      {
        // for numbered lists set the ol key
        ol: [
          'Item 1',
          'Item 2',
          'Item 3'
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
    }
  };

  pdfMake.createPdf(docDefinition).download(`${name.replace(' ', '')}-${Date.now()}.pdf`);
}