import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  CKEditorCloudConfig,
  CKEditorCloudResult,
  CKEditorModule,
  loadCKEditorCloud,
} from "@ckeditor/ckeditor5-angular";
import { NbCardModule } from "@nebular/theme";
import type {
  ClassicEditor,
  EditorConfig,
} from "https://cdn.ckeditor.com/typings/ckeditor5.d.ts";

@Component({
  selector: "ngx-ckeditor",
  template: `
    <nb-card>
      <nb-card-header> CKEditor </nb-card-header>
      <nb-card-body>
        @if (Editor && config) {
        <ckeditor
          data="<p>Hello, world!</p>"
          [editor]="Editor"
          [config]="config"
        >
        </ckeditor>
        }
      </nb-card-body>
    </nb-card>
  `,
  imports: [NbCardModule, CKEditorModule, FormsModule],
})
export class CKEditorComponent {
  public Editor: typeof ClassicEditor | null = null;

  public config: EditorConfig | null = null;

  public ngOnInit(): void {
    loadCKEditorCloud({
      version: "47.0.0",
      premium: false,
    }).then(this._setupEditor.bind(this));
  }

  private _setupEditor(cloud: CKEditorCloudResult<CKEditorCloudConfig>) {
    const { ClassicEditor, Essentials, Paragraph, Bold, Italic } =
      cloud.CKEditor;

    this.Editor = ClassicEditor;
    this.config = {
      licenseKey: "Copy key from ckeditor cloud",
      plugins: [Essentials, Paragraph, Bold, Italic],
      toolbar: ["undo", "redo", "|", "bold", "italic", "|"],
    };
  }
}
