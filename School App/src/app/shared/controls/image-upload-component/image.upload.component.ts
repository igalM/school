import { Component, OnInit, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'image-upload-component',
  templateUrl: './image.upload.component.html',
  styleUrls: ['./image.upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploadComponent,
      multi: true
    }
  ]
})
export class ImageUploadComponent implements OnInit {

  public loadingImage: boolean = false;
  public fileValidated: boolean = true;
  private onChange: Function;
  public file: File | null = null;

  @Input() title: string = '';

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.loadingImage = true;
    this.fileValidated = true;
    setTimeout(() => {
      if (this.fileValidated = this.fileValidation(file)) {
        this.onChange(file);
        this.file = file;
      }
      this.loadingImage = false;
    }, 1000)
  }

  writeValue() {
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  public fileValidation(file: File): boolean {
    const acceptedType = 'jpg';
    if (!file) return true;
    const extension = file.name.split('.')[1].toLowerCase();
    const maxSize = 2000000;
    if (acceptedType.toLowerCase() !== extension.toLowerCase() || file.size >= maxSize) return false;
    return true;
  }

}
