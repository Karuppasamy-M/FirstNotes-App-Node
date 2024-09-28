class Queries {
  // Table Creation Queries
  static const userTable = """
   CREATE TABLE ${DbProperty.user}
  (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'user_name' TEXT,
  'email' TEXT,
  'mobile_number' TEXT,
  'password' TEXT,
  'token' TEXT,
  'fcm_token' TEXT,
  'user_icon' TEXT,
  'security_pin' TEXT,
  'screen_lock_pin' TEXT,
  'hide_all_data' INTEGER NOT NULL DEFAULT 0,
  'current_app_version' TEXT,
  'last_login_os' TEXT,
  'last_login_date' TEXT,
  'last_logout_date' TEXT,
  'last_sync_date' TEXT,
  'last_backup_date' TEXT,
  'offline_db_sync_date' TEXT,
  'ctd_date' TEXT
  )
  """;

  // static const categoryTable = """
  // CREATE TABLE ${DbProperty.notesCategory}
  // ('id' INTEGER PRIMARY KEY AUTOINCREMENT,
  // 'category_name' TEXT,
  // 'ctd_date' TEXT,
  // 'etd_date' TEXT
  // )
  // """;

  static const categoryTable = """
  CREATE TABLE ${DbProperty.notesCategory}
  ('category_id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'user_id' INTEGER NOT NULL,
  'category_name' INTEGER,
  'archive' INTEGER NOT NULL DEFAULT 0,
  'trash' INTEGER NOT NULL DEFAULT 0,
  'ctd_date' TEXT,
  'udt_date' TEXT,
  FOREIGN KEY ('user_id') REFERENCES ${DbProperty.user} ('id')
  )
  """;

  static const subCategoryTable = """
  CREATE TABLE ${DbProperty.notesSubCategory}
  ('sub_category_id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'category_id' INTEGER NOT NULL,
  'sub_category_name' TEXT,
  'archive' INTEGER NOT NULL DEFAULT 0,
  'trash' INTEGER NOT NULL DEFAULT 0,
  'ctd_date' TEXT,
  'udt_date' TEXT,
  FOREIGN KEY ('category_id') REFERENCES ${DbProperty.notesCategory} ('id')
  )
  """;

  static const notesTable = """
   CREATE TABLE ${DbProperty.notes}
  ('note_id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'user_id' INTEGER NOT NULL,
  'category_id' INTEGER NOT NULL,
  'sub_category_id' INTEGER NOT NULL,
  'title' TEXT,
  'description' TEXT,
  'special_des' TEXT,
  'notes' TEXT,
  'attachments' TEXT,
  'label' TEXT,
  'note_color' TEXT,
  'pin' INTEGER NOT NULL DEFAULT 0,
  'favourite' INTEGER NOT NULL DEFAULT 0,
  'bookmark' INTEGER NOT NULL DEFAULT 0,
  'archive' INTEGER NOT NULL DEFAULT 0,
  'trash' INTEGER NOT NULL DEFAULT 0,
  'ctd_date' TEXT,
  'udt_date' TEXT,
   FOREIGN KEY ('category_id') REFERENCES ${DbProperty.notesCategory} ('category_id'),
   FOREIGN KEY ('sub_category_id') REFERENCES ${DbProperty.notesSubCategory} ('sub_category_id'))
  """;

  static const labelsTable = """
   CREATE TABLE ${DbProperty.labels}
  (
  'label_id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'user_id' INTEGER NOT NULL,
  'label_name' TEXT,
  'ctd_date' TEXT,
  'udt_date' TEXT
  )
  """;

  static const taskTable = """
   CREATE TABLE ${DbProperty.tasks}
  (
  'task_id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'user_id' INTEGER NOT NULL,
  'category_id' INTEGER NOT NULL,
  'sub_category_id' INTEGER NOT NULL,
  'task_title' TEXT,
  'description' TEXT,
  'task_list' TEXT,
  'pin' INTEGER NOT NULL DEFAULT 0,
  'pin_order_number' INTEGER NOT NULL DEFAULT 0,
  'remainder_notify' TEXT,
  'remainder_alarm' TEXT,
  'ctd_date' TEXT,
  'udt_date' TEXT,
   FOREIGN KEY ('category_id') REFERENCES ${DbProperty.notesCategory} ('category_id'),
   FOREIGN KEY ('sub_category_id') REFERENCES ${DbProperty.notesSubCategory} ('sub_category_id')
  )
  """;

  static const notificationTable = """
   CREATE TABLE ${DbProperty.notify}
  (
  'notify_id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'user_id' INTEGER NOT NULL,
  'note_id' INT,
  'task_id' INT,
  'notify_for' TEXT,
  'notify_status' TEXT,
  'notify_date' TEXT,
  'remainder_notify_date' TEXT,
  'alarm_date' TEXT,
  'remainder_alarm_date' TEXT,
  'ctd_date' TEXT,
  'udt_date' TEXT,
   FOREIGN KEY ('note_id') REFERENCES ${DbProperty.notes} ('note_id')
  )
  """;
