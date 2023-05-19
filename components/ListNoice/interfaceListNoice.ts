
export interface IResponseNotification {
    id?: string;
    type: NotificationType;
    title: string;
    content: string;
    registrant: string;
    status: NotificationStatus;
    users: string[];
    // For Popup
    display?: NotificationDisplayPopup;
    display_start?: number;
    display_end?: number;
    // For Sending Note
    sending_status?: NotificationSendNoteStatus;
    force_reading?: boolean;
    user_level?: number;
    send_type?: NotificationSendType;
    specify_date?: number;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
}

type NotificationType = 'Template' | 'Announcement' | 'Event' | 'Betting rules' | 'Popup' | ' Send note'
type NotificationSendType = 'Level' | 'Selected users' | 'All users';
type NotificationStatus = 'Active' | 'Inactive' | 'Deleted';
type NotificationSendNoteStatus = ' Now' | 'Waiting' | 'Shipment Completed';
type NotificationDisplayPopup = 'Before' | 'After' | 'Both';