import { Component, OnInit, inject, signal } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { Extension } from '@models/extension.model';
import { ExtensionService } from '@services/extension.service';
import { ExtensionListComponent } from './extension-list/extension-list.component';
import { ExtensionPageComponent } from './extension-page/extension-page.component';

@Component({
    selector: 'app-extensions-dialog',
    standalone: true,
    imports: [MaterialModule, ExtensionListComponent, ExtensionPageComponent],
    templateUrl: './extensions-dialog.component.html',
    styleUrl: './extensions-dialog.component.scss'
})
export class ExtensionsDialogComponent implements OnInit {
    public readonly startExtensionStatuses = new Map<string, boolean>();

    public readonly extensions = signal<Extension[]>([]);
    public readonly selectedExtension = signal<Extension | null>(null);
    public readonly confirmationRequested = signal(false);

    private readonly extensionService = inject(ExtensionService);

    public ngOnInit(): void {
        this.extensionService.getExtensions().subscribe(extensions => {
            this.extensions.set(extensions);

            this.startExtensionStatuses.clear();
            for (const extension of extensions) {
                this.startExtensionStatuses.set(
                    extension.id,
                    extension.installed
                );
            }
        });
    }

    public selectExtension(extension?: Extension): void {
        this.selectedExtension.set(extension ?? null);

        if (!extension) {
            const changed = this.extensions().some(
                x => x.installed !== this.startExtensionStatuses.get(x.id)!
            );

            this.confirmationRequested.set(changed);
        }
    }

    public confirm(): void {
        this.confirmationRequested.set(false);
        this.extensionService.installExtensions(
            this.extensions()
                .filter(x => x.installed)
                .map(x => x.id)
        );
    }
}
