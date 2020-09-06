import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    eventData = [];
    title = 'ticket-booking';
    searchText = '';
    imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzH4-v5b4I1h0vldUHxJx3TluE4PXnvgty7Q&usqp=CAU';
    constructor(private api: ApiService) {
    }
    ngOnInit(): void {
        this.api.get('events').subscribe((result) => {
            if(result.success) {
                this.eventData = result.data
            }
        });
    }
}
