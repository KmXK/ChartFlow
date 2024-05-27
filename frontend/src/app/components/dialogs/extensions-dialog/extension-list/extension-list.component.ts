import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Extension } from './../../../../models/extension.model';

@Component({
    selector: 'app-extension-list',
    standalone: true,
    imports: [],
    templateUrl: './extension-list.component.html',
    styleUrl: './extension-list.component.scss'
})
export class ExtensionListComponent {
    @Input() public extensions!: Extension[];

    @Output() public selectExtension = new EventEmitter<Extension>();
}
