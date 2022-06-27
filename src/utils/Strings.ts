export default class{
    static appName:string = "مكتبة الكتورنية - بوابة الاعضاء";
    static menuColor :string = '#F9F9F9';
    // --------------------------------------------------------------- //
    // control page direction
    static  PAGE_DIR  = "rtl";
    static isRtl = false;
    // --------------------------------------------------------------- //
    // sign in strings
    static userName :string = "اسم المستخدم";
    static password :string = "كلمة المرور";
    static signInButtonText :string = "تسجيل الدخول";
    static rememberMe  :string = "تذكرني";
    static forgetPassword  :string = "نسيت كلمة المرور";
    static dontHaveAccount  :string = " ليس لديك حساب ؟ سجل الأن";
    static allRightsReserved: string = "جميع الحقوق محفوظة";
    static add: string = "اضافة";
    static firstName: string = "الأسم الأول";
    static lastName: string = "الأسم الأخير";
    static email: string = "الايميل";
    static activeUser: string = "تفعيل المستخدم";
    static activeCitizen: string = "تفعيل العضوية";
    static normalUser : string = "مستخدم عادي";
    static admin : string = "مدير";
    static permission :string = "الصلاحية";
    static userCreated :string = "تم انشاء المستخدم";
    static userNotCreated :string = "توجد مشكلة في البيانات";
    static edit : string = "تعديل";
    static citizen : string = " مواطن ";
    static citizens : string = " المواطنون ";
    static user :string = " مستخدم ";
    static users : string = " المستخدمون ";
    static abouts : string = " معلومات اضافية ";
    static police_offices : string = " مراكز الشرطة ";
    // --------------------------------------------------------------- //
    // drawer menu items
    static menuMain: string = "الرئيسية";
    static menuUsers: string = "المستخدمين";
    static menuCitizen: string = "المواطنون";
    static menuReports: string = "البلاغات";
    static menuPolicesOffices: string = "مراكز الشرطة";
    static menuAdditionInfo: string = "معلومات اضافية";
    // --------------------------------------------------------------- //
    // dashboard strings
    static userCounts:string = "عدد المستخدمين";
    static reportCount:string = "عدد التقارير";
    static citizenCount:string = "عدد المواطنين";
    static myProfile:string = "حسابي";
    static logout : string = "تسجيل الخروج";
    static id: string = "الرقم";
    static isActive: string = "حالة الحساب";
    static createdAt: string = "تاريخ الانشاء";
    static updatedAt: string = "تاريخ التعديل";
    static fullName: string = "الأسم الكامل";
    static repoterName: string = "اسم صاحب البلاغ";
    static delete : string = "حذف";
    // --------------------------------------------------------------- //
    static no : string = "لا";
    static areYouSureToDelete : string = "هل أنت متأكد من عملة الحذف";
    static youCantUndoThisStep : string = "ملاحظة في حالة موافقتك على هذا الاجراء فأنك لن تستطيق التراجع";
    // --------------------------------------------------------------- //
    static unauthorized : string = "يرجى التاكد من بياناتك";
  static youMustfillData: string = "يجب عليك تعبئة البيانات";
  static phone: string = "رقم الهاتف";
  static city: string = "المدينة";
  static location: string = "الموقع";
  static office_name : string = " اسم المركز ";
  static police_office : string = " مركز شرطة ";
  static fieldValue: string = 'قيمة لحقل';
  static fieldName : string = 'اسم الحقل';
  static fields: string = ' معلومات  ';
  static about : string = ' حقول اضافية ' ;
  // init value to map 
  static initMap = {
    lat: 32.36447150118714,
    lng : 15.16091104212196
  };
  // --------------------------------------------------- //
  // static API_URL : string = "http://localhost:4000/";
  static API_URL : string = "http://158.101.167.198:4000/";
  // --------------------------------------------------- //
  // الاقسام
  static departments : string = 'الاقسام';
  static department : string = ' قسم ' ;
  static dep_name : string = 'اسم القسم';
  static dep_code : string = 'كود القسم';
  // --------------------------------------------------- //
  // members
  static members : string = ' العضويات ';
  static member : string = ' عضوية ';
  static student : string = ' طالب' ;
  static teacher : string = ' مدرس' ;
  static memberType : string = 'نوع العضوية';
  static memberName : string = 'اسم العضو';
  // --------------------------------------------------- //
  // book
  static book : string = ' كتاب ';
  static bookImage : string = 'صورة الكتاب';
  static books : string = 'الكتب';
  static bookName: string = 'اسم الكتاب';
  static bookPublishDate: string = 'تاريخ النشر ';
  static authorName: string = 'المؤلف';
  static bookPages: string = 'عدد الصفحات';
  static bookPublisher: string = 'دار النشر';
  static bookDescription: string = 'الوصف';
  static returnDate: string = 'تاريخ الاعادة';
  static stayed: string = 'موجود';
  static barrowed: string = 'تمت الاعارة';
  static state: string = 'حالة الكتاب';
  static control : string = 'التحكم';
  static uploadImage : string = 'رفع صورة';
  // --------------------------------------------------- //
  // barrows
  static barrows : string = 'الإعارة';
  static barrow : string = 'المستعير';
  static addBarrow : string = ' اعارة ';
  static author: string = 'المؤلف'; 
  static authors: string = 'المؤلفين'; 
  static bookCount: string = 'عدد النسخ';
  static isbn: string = 'ISBN';
  static memberLogin: String = 'بوابة اعضاء المكتبة';
  // --------------------------------------------------- //
  static columnMenuUnsort: String = 'إلغاء الترتيب';
  static columnMenuSortAsc: String = 'ترتيب تصاعدي';
  static columnMenuSortDesc: String = 'ترتيب تنازلي';
  static columnMenuFilter: String = 'فلترة';
  static columnMenuHideColumn: String = 'اخفاء الحقل';
  static columnMenuShowColumns: String = 'التحكم في حالة الاعمدة';
  // --------------------------------------------------- //

}