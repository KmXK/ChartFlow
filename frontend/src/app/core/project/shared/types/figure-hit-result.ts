import { Figure } from '@core/figures/base/figure';
import { GroupFigure } from '@core/figures/group.figure';

export enum FigureTreeNodeType {
    Figure,
    Group
}

export type FigureTreeNode =
    | {
          type: FigureTreeNodeType.Figure;
          figure: Figure;
      }
    | {
          type: FigureTreeNodeType.Group;
          figure: GroupFigure;
          figures: FigureTreeNode[];
          plainFigures: Figure[];
      };
