import Notes from './models/Notes';
import { Pot } from './models/Pot';
import Status from './models/Status';
import {
  ImageStoreState,
  ImportStatePersisted,
  PotsStoreState,
  SettingsState,
} from './reducers/types';

export type Action =
  | LoadingAction
  | PotAction
  | ImageAction
  | UiAction
  | ImportAction
  | ExportAction
  | SettingsAction;

type LoadingAction = LoadedEverything | Reload;

type ImageAction =
  | ImageAdd
  | ImageDeleteFromPot
  | ImageErrorLocal
  | ImageRemoteFailed
  | ImageFileCreated
  | ImageFileFailed
  | ImageResetLoaded;

type PotAction =
  | New
  | PotEditNote
  | PotEditTitle
  | PotEditImages3
  | PotEditStatus
  | PotDelete
  | PotCopy;

type UiAction =
  | PageList
  | PageEditPot
  | PageSettings
  | ListSearchOpen
  | ListSearchClose
  | ListSearchTerm
  | ListCollapse
  | ListScroll
  | PageImage;

type ImportAction =
  | ImportInitiate
  | ImportInitiateUrl
  | ImportStarted
  | ImportedMetadata
  | ImportMetadataAgain
  | ImageTimeout
  | ImportCancel
  | ImportFailure
  | ImportResume
  | ImportResumeAffirm
  | ImportResumeCancel;

type ExportAction = ExportStatus | ExportFinished;

type SettingsAction = SetDarkModeSetting;

// interface MigrateFromImages2 {
//     type: 'migrate-from-images2';
//     images2: Image2[];
//     potId: string;
// }

// interface Loaded {
//     type: 'loaded';
//     pots: { [uuid: string]: Pot };
//     potIds: string[];
//     isImport: boolean;
// }

interface LoadedEverything {
  type: 'loaded-everything';
  pots: PotsStoreState;
  images: ImageStoreState;
  isImport: boolean;
  settings: SettingsState | null; // null when isImport
}

interface New {
  type: 'new';
  pot: Pot;
}

interface PotEditField {
  type: 'pot-edit-field';
  potId: string;
  field: string;
  value: any;
}

interface PotEditNote extends PotEditField {
  field: 'notes2';
  value: Notes;
}

interface PotEditTitle extends PotEditField {
  field: 'title';
  value: string;
}

interface PotEditImages3 extends PotEditField {
  field: 'images3';
  value: string[];
}

interface PotEditStatus extends PotEditField {
  field: 'status';
  value: Status;
}

interface PotDelete {
  type: 'pot-delete';
  potId: string;
  imageNames: string[];
}

interface PageList {
  type: 'page-list';
}

interface PotCopy {
  type: 'pot-copy';
  potId: string;
  newPotId: string;
  imageNames: string[];
}

// interface ImageStateLoaded {
//     type: 'image-state-loaded';
//     isImport: boolean;
//     images: { [name: string]: ImageState };
// }

interface Reload {
  type: 'initial-pots-images';
}

interface ImportedMetadata {
  type: 'imported-metadata';
}

interface ImageDeleteFromPot {
  type: 'image-delete-from-pot';
  imageName: string;
  potId: string;
}

interface ImageAdd {
  type: 'image-add';
  potId: string;
  localUri: string;
}

interface ImageErrorLocal {
  type: 'image-error-local';
  name: string;
}

interface ImageRemoteFailed {
  type: 'image-remote-failed';
  name: string;
}

interface ImageResetLoaded {
  type: 'image-reset-loaded';
  oldUri: string;
  newUri: string;
}

interface ImageFileCreated {
  type: 'image-file-created';
  name: string;
  fileUri: string;
}

interface ImageFileFailed {
  type: 'image-file-failed';
  uri: string;
}

interface ImportInitiate {
  type: 'import-initiate';
}

interface ImportInitiateUrl {
  type: 'import-initiate-url';
  url: string;
}

interface ImportStarted {
  type: 'import-started';
  metadata: string;
  imageMap: { [name: string]: string };
}

interface ImageTimeout {
  type: 'image-timeout';
  uri: string;
}

interface ImportCancel {
  type: 'import-cancel';
}

interface ImportFailure {
  type: 'import-failure';
  error: string | Error;
}

interface ImportMetadataAgain {
  type: 'import-metadata-again';
  metadata: string;
}

interface ImportResume {
  type: 'import-resume';
  data: ImportStatePersisted;
}

interface ImportResumeAffirm {
  type: 'import-resume-affirm';
}

interface ImportResumeCancel {
  type: 'import-resume-cancel';
}

interface ExportStatus {
  type: 'export-status';
  exportId: number;
  exporting: boolean;
  status: string;
}

interface ExportFinished {
  type: 'export-finished';
  exportId: number;
  uri: string;
}

interface PageEditPot {
  type: 'page-edit-pot';
  potId: string;
}

interface PageSettings {
  type: 'page-settings';
}

interface ListSearchOpen {
  type: 'list-search-open';
}

interface ListSearchClose {
  type: 'list-search-close';
}

interface ListSearchTerm {
  type: 'list-search-term';
  text: string;
}

interface ListCollapse {
  type: 'list-collapse';
  section: string;
}

interface ListScroll {
  type: 'list-scroll';
  y: number;
}

interface PageImage {
  type: 'page-image';
  imageId: string;
}

interface SetDarkModeSetting {
  type: 'settings-set-dark-mode';
  value: boolean | undefined;
}
