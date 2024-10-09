import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class footerComponent implements OnInit {

  constructor(private _httpclient: HttpClient) { }


  public name: string = "";
  public email: string = "";
  public message: string = "";

  ngOnInit(): void {

  }

  onSubmit() {

    this._httpclient.post("/api/ugv/submitContact/", {
      name: this.name,
      email: this.email,
      message: this.message
    },
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8;',
          'lang': localStorage.getItem('language') === 'en' ? 'en' : 'ar'
        }
      }).subscribe((response: any) => {
      alert("data submitted");
    });
  }

}
