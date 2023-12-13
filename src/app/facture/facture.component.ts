import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  todayDate: number;
  constructor(private factureService: FactureService) {
    this.todayDate = Date.now();
   }

  ngOnInit(): void {
  }

  exportToPDF() {
    if (this.htmlData) {
      const DATA: any = this.htmlData.nativeElement;

      html2canvas(DATA).then((canvas) => {
        const fileWidth = 210;
        const fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        const PDF = new jsPDF('p', 'mm', 'a4');
        const position = 0;

        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('facture.pdf');
      });
    } else {
      console.error('ViewChild htmlData is not defined.');
    }
  }

  getClientData() {
    return this.factureService.getClientData();
  }

  getReservationData() {
    return this.factureService.getReservationData();
  }

  getPaymentData() {
    return this.factureService.getPaymentData();
  }
  
  getVoitureData(){
    return this.factureService.getVoitureData();
  }

 
}
