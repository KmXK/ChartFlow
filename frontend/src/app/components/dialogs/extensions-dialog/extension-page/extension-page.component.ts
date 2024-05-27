import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { Comment } from '@models/comment.model';
import { Extension } from '@models/extension.model';
import { ExtensionService } from '@services/extension.service';

@Component({
    selector: 'app-extension-page',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule, DatePipe],
    templateUrl: './extension-page.component.html',
    styleUrl: './extension-page.component.scss'
})
export class ExtensionPageComponent implements OnInit {
    @Input() public extension!: Extension;

    public readonly comments = signal<Comment[]>([]);

    private readonly extensionService = inject(ExtensionService);

    public toggleInstallation(): void {
        this.extension.installed = !this.extension.installed;
    }

    public commentForm: FormGroup;
    public ratings: number[] = [1, 2, 3, 4, 5];

    constructor(private fb: FormBuilder) {
        this.commentForm = this.fb.group({
            comment: ['', Validators.required],
            rating: [null, Validators.required]
        });
    }

    public ngOnInit(): void {
        this.updateComments();
    }

    public onSubmitComment(): void {
        if (this.commentForm.valid) {
            this.extensionService
                .addComment(
                    this.extension.id,
                    this.commentForm.controls.comment.value,
                    this.commentForm.controls.rating.value
                )
                .subscribe(() => {
                    this.updateComments();
                });
        }
    }

    private updateComments(): void {
        this.extensionService
            .getComments(this.extension.id)
            .subscribe(comments => {
                this.comments.set(comments);
            });
    }
}
