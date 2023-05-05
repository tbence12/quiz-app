import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent {
  message = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('keys: ', params.keys);
      console.log('message: ', params.get('message'));
      this.message = params.get('id') + ' & ' + params.get('message');
    }, error => {
      console.log('parammap error: ', error);
    })
  }
}
