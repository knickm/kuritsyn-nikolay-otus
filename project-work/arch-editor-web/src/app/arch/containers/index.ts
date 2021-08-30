import { ElementsMenuComponent } from "./elements-menu/elements-menu.component";
import { ElementsPropertyComponent } from "./elements-property/elements-property.component";
import { ActorElementComponent } from "./elements/actor-element/actor-element.component";
import { UseCaseElementComponent } from "./elements/use-case-element/use-case-element.component";
import { MouseEventDirective } from "./plot/mouse-event.directive";
import { PlotComponent } from "./plot/plot.component";
import { ProjectEditorComponent } from "./project-editor/project-editor.component";
import { ProjectListComponent } from "./project-list/project-list.component";

export const components = [
	ProjectEditorComponent,
	ProjectListComponent,

	MouseEventDirective,
	PlotComponent,
	ElementsMenuComponent,
	ElementsPropertyComponent,

	ActorElementComponent,
	UseCaseElementComponent,
];


