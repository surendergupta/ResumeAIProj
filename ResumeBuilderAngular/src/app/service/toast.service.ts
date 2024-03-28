import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast:ToastrService) { }

  showSuccess(header:string,body:string)
  { this.dismiss()
    this.toast.success(header,body)

  }

  showFailure(header:string,body:string)
  {
    this.dismiss()
    this.toast.error(header,body);
  }
  showInfo(header:string,body:string)
  {
    this.dismiss()
    this.toast.info(header,body)
  }

  dismiss()
  {
    this.toast.clear();
  }


}
