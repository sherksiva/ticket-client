import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../app.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy{
    bookingForm: FormGroup;
    private sub: any;
    currentBooking: any = {};
    currentId: any = '';
    imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzH4-v5b4I1h0vldUHxJx3TluE4PXnvgty7Q&usqp=CAU';
    constructor(
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        private route: Router,
        private api: ApiService
    ) {}
    ngOnInit(): void {
        console.log(this.activeRoute , "ACTIVEROUTES")
        console.log(history , "djhfkjdshfkjd")
        this.sub = this.activeRoute.params.subscribe(params => {
            console.log(params, "jshfsdkjfhdskj")
            this.currentId = params['id'];
            debugger;
            this.api.get('events', params).subscribe((result)=> {
                console.log(result, "RESULT")
                if(result.success) {
                    this.currentBooking = result.data[0];
                }
            })
         });
        this.bookingForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            number: ['', [Validators.required,  Validators.pattern("[0-9 ]{10}")]],
            numberofseats: [1, [Validators.required]],
            attendies: this.formBuilder.array([this.addAttendies()])
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
      }
    
    get bf () {
        return this.bookingForm.controls;
    }

    addAttendies() {
        return this.formBuilder.group({
            attendeename: ['', Validators.required]
        });
    }

    bookingData(index, item){
        return item.name; 
    }

    get itemRows(): FormArray {
        return this.bookingForm.get('attendies') as FormArray;
    }

    onChangeSelect(data) {
         this.itemRows.controls = [];
         for(let i=0; i< data; i++) {
            this.itemRows.push(this.addAttendies());
         }
    }

    get attendies(): FormArray {
        return this.bookingForm.get('products') as FormArray;
    }

    getErrorMessage(index: number) {
         return this.itemRows.controls[index].status === 'VALID' ? '' : 'Attendee field is required'
    }

    onSubmit() {
        const { numberofseats } = this.bookingForm.value;
        if(numberofseats < this.currentBooking.seats) {
            this.api.put('events', {seats: (this.currentBooking.seats- numberofseats) , id:this.currentId}).subscribe((result) => {
                if (result.success) {
                    this.route.navigate(['/']);
                }
            })
        }
        console.log(this.bookingForm.value, "bookingForm")
    }
  
}
