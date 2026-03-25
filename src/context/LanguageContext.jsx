import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    dir: 'ltr',
    nav: {
      shop: 'Shop', home: 'Home', story: 'Our Story', blog: 'Blog', offers: 'Offers',
      hospitality: 'Hospitality',
      myOrders: 'My Orders',
      contact: 'Contact', login: 'Login', register: 'Register',
      cart: 'Cart', search: 'Search products…',
    },
    hospitality: {
      bedLinens: 'Bed Linens',
      towels: 'Towels',
      chaffings: 'Chaffings',
      bathrobes: 'Bathrobes',
      pillowCovers: 'Pillow Covers',
    },
    orders: {
      title: 'My Orders',
      orderId: 'Order ID',
      date: 'Date',
      status: 'Status',
      total: 'Total',
      track: 'Track Order',
      noOrders: 'You have no orders yet.',
      st_processing: 'Processing',
      st_shipped: 'Shipped',
      st_out: 'Out for Delivery',
      st_delivered: 'Delivered',
      estimated: 'Estimated Delivery',
    },
    cart: {
      title: 'Your Cart', empty: 'Your cart is empty.',
      continueShopping: 'Continue Shopping', subtotal: 'Subtotal',
      shipping: 'Shipping & taxes calculated at checkout.',
      checkout: 'Secure Checkout',
    },
    footer: {
      newsletter: 'Join the Conscious Community',
      newsletterSub: 'Get eco tips, new arrivals, and artisan stories delivered to your inbox.',
      subscribe: 'Subscribe', subscribed: '✓ Thank you for subscribing!',
      shop: 'Shop', company: 'Company', legal: 'Legal & Privacy',
      rights: '© {year} Soul Love & Earth. All rights reserved.',
    },
    home: {
      heroTitle: 'Rooted in Earth.\nCrafted with Soul.',
      heroSub: 'Sustainable, artisan-made products for conscious homes and eco-friendly hospitality.',
      shopNow: 'Shop Now', ourStory: 'Our Story',
      collectionsTitle: 'Featured Collections',
      collectionsSub: 'Discover our curated range of eco-conscious products',
      viewAll: 'View All', explore: 'Explore',
      whyTitle: 'Why Soul Love & Earth?',
      whySub: 'We believe beautiful living and responsible choices go hand in hand.',
      valuesTitle: 'Our Values',
      values: [
        { title: 'Ethically Sourced', desc: 'Every product is thoughtfully sourced from certified artisan communities across India.' },
        { title: 'Eco Packaging', desc: 'Zero plastic. Every order ships in 100% compostable, recycled packaging.' },
        { title: 'Artisan Crafted', desc: 'Each piece is handcrafted by skilled artisans, preserving centuries-old techniques.' },
        { title: 'Free UAE Delivery', desc: 'Complimentary delivery on all orders within the UAE. No minimums required.' },
      ],
      yearsOfCraft: '15+ Years of Craft',
      storyTitle: 'Craftsmanship that\nPreserves the Planet.',
      storySub: 'Our Heritage',
      storyP1: 'Born from a deep respect for traditional Indian artisanship and a commitment to planetary health, Soul Love & Earth bridges the gap between ancient wisdom and modern living.',
      storyP2: 'We partener with master craftsmen to bring you products that are as kind to the earth as they are beautiful for your home.',
      readStory: 'Read Our Story',
      stats: [
        { num: '500+', label: 'Artisans' },
        { num: '100%', label: 'Sustainable' },
        { num: '0', label: 'Plastic' },
      ],
    },
    shop: {
      title: 'The Collection',
      sub: 'Handcrafted, sustainable products for mindful living.',
      allCategories: 'All Categories', sortBy: 'Sort By',
      sortDefault: 'Latest', sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low', sortNameAz: 'Name: A-Z',
      loading: 'Loading…', noProducts: 'No products found.',
      results: '{n} products found',
    },
    product: {
      sale: 'Sale', addToCart: 'Add to Bag — {price}',
      added: '✓  Added to Cart', quantity: 'Quantity',
      trustQuality: 'Quality Guaranteed', trustEthical: 'Ethically Sourced',
      trustEco: 'Eco Packaging', trustReturn: 'Free Returns',
      reviews: 'Customer Reviews', reviewsOf: '{n} reviews',
      writeReview: 'Write a Review', submitReview: 'Submit Review',
      ratingLabel: 'Your Rating *', clickStar: 'Click a star to rate',
      nameLabel: 'Your Name *', reviewLabel: 'Your Review *',
      reviewPlaceholder: 'Share your honest experience with this product…',
      thankYou: '✓ Thank you! Your review has been posted.',
      relatedTitle: 'From the Same Collection', relatedSub: 'Explore More',
      noReviews: 'No reviews yet. Be the first!',
      youMayLike: 'You May Also Like',
    },
    checkout: {
      title: 'Checkout', backtToCart: 'Back to Cart',
      contact: 'Contact Details', shipping: 'Shipping Address',
      payment: 'Payment Method', orderSummary: 'Order Summary',
      firstName: 'First Name', lastName: 'Last Name',
      email: 'Email Address', phone: 'Phone Number',
      address: 'Street Address', city: 'City',
      country: 'Country', zipCode: 'ZIP / Postal Code',
      cardNumber: 'Card Number', expiry: 'Expiry (MM/YY)', cvv: 'CVV',
      nameOnCard: 'Name on Card', payBtn: 'Place Order',
      processing: 'Processing…', freeshipping: 'Free Shipping (UAE)',
      subtotal: 'Subtotal', total: 'Total',
      orderConfirmed: 'Order Confirmed!',
      orderConfirmedMsg: 'Thank you for your purchase. We\'ll send you a confirmation email shortly.',
      continueShop: 'Continue Shopping',
    },
    contact: {
      title: 'Get in Touch', sub: 'We\'d love to hear from you.',
      yourName: 'Your Name', email: 'Email Address',
      subject: 'Subject', message: 'Message',
      send: 'Send Message', sending: 'Sending…',
      sent: 'Message sent! We\'ll get back to you soon.',
    },
    story: {
      title: 'Our Story', tagline: 'Where Earth Meets Soul.',
    },
    blog: {
      title: 'Journal', sub: 'Stories, tips, and wisdom for conscious living.',
      readMore: 'Read More', category: 'Category',
    },
    legal: {
      breadcrumbHome: 'Home',
      category: 'Legal & Policies',
      haveQuestions: 'Have Questions?',
      haveQuestionsSub: 'Our team is always happy to help with any queries.',
      contact: 'Contact Us',
    },
    auth: {
      loginTitle: 'Welcome Back',
      loginSub: 'Sign in to your Soul Love & Earth account',
      email: 'Email Address', password: 'Password',
      forgotPassword: 'Forgot password?', loginBtn: 'Sign In',
      noAccount: "Don't have an account?", registerLink: 'Create one',
      registerTitle: 'Create Your Account',
      registerSub: 'Join the conscious community of Soul Love & Earth',
      firstName: 'First Name', lastName: 'Last Name',
      phone: 'Phone Number', confirmPassword: 'Confirm Password',
      registerBtn: 'Create Account', hasAccount: 'Already have an account?',
      loginLink: 'Sign in', agreeText: 'By creating an account, you agree to our',
      terms: 'Terms & Conditions', and: 'and', privacy: 'Privacy Policy',
    },
    common: {
      home: 'Home', backToTop: 'Back to Top',
      loading: 'Loading…', errorGeneric: 'Something went wrong.',
    },
  },

  ar: {
    dir: 'rtl',
    nav: {
      shop: 'المتجر', home: 'الرئيسية', story: 'قصتنا', blog: 'المدونة',
      offers: 'العروض', hospitality: 'الضيافة',
      myOrders: 'طلباتي', contact: 'تواصل معنا',
      login: 'تسجيل الدخول', register: 'إنشاء حساب',
      cart: 'السلة', search: 'ابحث عن المنتجات…',
    },
    hospitality: {
      bedLinens: 'بياضات الأسرّة',
      towels: 'مناشف',
      chaffings: 'أوعية التسخين',
      bathrobes: 'أرواب الحمام',
      pillowCovers: 'أغطية الوسائد',
    },
    orders: {
      title: 'طلباتي',
      orderId: 'رقم الطلب',
      date: 'التاريخ',
      status: 'الحالة',
      total: 'المجموع',
      track: 'تتبع الطلب',
      noOrders: 'ليس لديك طلبات بعد.',
      st_processing: 'قيد المعالجة',
      st_shipped: 'تم الشحن',
      st_out: 'خارج للتوصيل',
      st_delivered: 'تم التوصيل',
      estimated: 'موعد التوصيل المتوقع',
    },
    cart: {
      title: 'سلة التسوق', empty: 'سلة تسوقك فارغة.',
      continueShopping: 'متابعة التسوق', subtotal: 'المجموع الفرعي',
      shipping: 'يُحسب الشحن والضرائب عند الدفع.',
      checkout: 'إتمام الشراء بأمان',
    },
    footer: {
      newsletter: 'انضم إلى مجتمعنا الواعي',
      newsletterSub: 'احصل على نصائح بيئية ووصولات جديدة وقصص الحرفيين في بريدك.',
      subscribe: 'اشترك', subscribed: '✓ شكراً للاشتراك!',
      shop: 'المتجر', company: 'الشركة', legal: 'القانونية والخصوصية',
      rights: '© {year} سول لاف آند إيرث. جميع الحقوق محفوظة.',
    },
    home: {
      heroTitle: 'من رحم الأرض.\nبروح الحرفي.',
      heroSub: 'منتجات مستدامة ومصنوعة يدوياً للمنازل الواعية وضيافة صديقة للبيئة.',
      shopNow: 'تسوّق الآن', ourStory: 'قصتنا',
      collectionsTitle: 'مجموعاتنا المميزة',
      collectionsSub: 'اكتشف مجموعتنا المختارة من المنتجات الواعية بيئياً',
      viewAll: 'عرض الكل', explore: 'استكشف',
      whyTitle: 'لماذا سول لاف آند إيرث؟',
      whySub: 'نؤمن بأن الحياة الجميلة والخيارات المسؤولة يسيران جنباً إلى جنب.',
      valuesTitle: 'قيمنا',
      values: [
        { title: 'مصادر أخلاقية', desc: 'كل منتج مصدره مجتمعات حرفية معتمدة في جميع أنحاء الهند.' },
        { title: 'تغليف صديق للبيئة', desc: 'لا بلاستيك. كل طلب يُشحن في تغليف قابل للتحلل ومعاد تدويره بنسبة 100٪.' },
        { title: 'صناعة يدوية', desc: 'كل قطعة مصنوعة يدوياً من قبل حرفيين مهرة، مع الحفاظ على تقنيات عمرها قرون.' },
        { title: 'توصيل مجاني في الإمارات', desc: 'توصيل مجاني لجميع الطلبات داخل الإمارات. بدون حد أدنى للطلب.' },
      ],
      yearsOfCraft: '15+ عاماً من الحرفة',
      storyTitle: 'حرفية تحافظ\nعلى كوكبنا.',
      storySub: 'تراثنا',
      storyP1: 'وُلدت سول لاف آند إيرث من الاحترام العميق للحرف اليدوية الهندية التقليدية والالتزام بصحة الكوكب ، وتعمل على سد الفجوة بين الحكمة القديمة والحياة الحديثة.',
      storyP2: 'نحن نشارك كبار الحرفيين لنقدم لك المنتجات التي هي لطيفة للأرض كما هي جميلة لبيتك.',
      readStory: 'اقرأ قصتنا',
      stats: [
        { num: '+500', label: 'حرفي' },
        { num: '100%', label: 'مستدام' },
        { num: '0', label: 'بلاستيك' },
      ],
    },
    shop: {
      title: 'المجموعة',
      sub: 'منتجات مصنوعة يدوياً ومستدامة للحياة الواعية.',
      allCategories: 'جميع الفئات', sortBy: 'ترتيب حسب',
      sortDefault: 'الأحدث', sortPriceAsc: 'السعر: من الأقل للأعلى',
      sortPriceDesc: 'السعر: من الأعلى للأقل', sortNameAz: 'الاسم: أ-ي',
      loading: 'جارٍ التحميل…', noProducts: 'لا توجد منتجات.',
      results: 'تم العثور على {n} منتجاً',
    },
    product: {
      sale: 'تخفيض', addToCart: 'أضف إلى السلة — {price}',
      added: '✓  تمت الإضافة', quantity: 'الكمية',
      trustQuality: 'جودة مضمونة', trustEthical: 'مصادر أخلاقية',
      trustEco: 'تغليف صديق للبيئة', trustReturn: 'إرجاع مجاني',
      reviews: 'آراء العملاء', reviewsOf: '{n} تقييم',
      writeReview: 'اكتب تقييماً', submitReview: 'إرسال التقييم',
      ratingLabel: 'تقييمك *', clickStar: 'انقر على نجمة للتقييم',
      nameLabel: 'اسمك *', reviewLabel: 'تقييمك *',
      reviewPlaceholder: 'شارك تجربتك الصادقة مع هذا المنتج…',
      thankYou: '✓ شكراً! تم نشر تقييمك.',
      relatedTitle: 'من نفس المجموعة', relatedSub: 'استكشف المزيد',
      noReviews: 'لا توجد تقييمات بعد. كن الأول!',
      youMayLike: 'قد يعجبك أيضاً',
    },
    checkout: {
      title: 'الدفع', backtToCart: 'العودة للسلة',
      contact: 'بيانات التواصل', shipping: 'عنوان الشحن',
      payment: 'طريقة الدفع', orderSummary: 'ملخص الطلب',
      firstName: 'الاسم الأول', lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني', phone: 'رقم الهاتف',
      address: 'العنوان', city: 'المدينة',
      country: 'الدولة', zipCode: 'الرمز البريدي',
      cardNumber: 'رقم البطاقة', expiry: 'تاريخ الانتهاء', cvv: 'CVV',
      nameOnCard: 'الاسم على البطاقة', payBtn: 'تأكيد الطلب',
      processing: 'جارٍ المعالجة…', freeshipping: 'شحن مجاني (الإمارات)',
      subtotal: 'المجموع الفرعي', total: 'الإجمالي',
      orderConfirmed: 'تم تأكيد الطلب!',
      orderConfirmedMsg: 'شكراً على شرائك. سنرسل لك بريد تأكيد قريباً.',
      continueShop: 'متابعة التسوق',
    },
    contact: {
      title: 'تواصل معنا', sub: 'يسعدنا سماع منك.',
      yourName: 'اسمك', email: 'البريد الإلكتروني',
      subject: 'الموضوع', message: 'رسالتك',
      send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…',
      sent: 'تم الإرسال! سنرد عليك قريباً.',
    },
    story: {
      title: 'قصتنا', tagline: 'حيث تلتقي الأرض بالروح.',
    },
    blog: {
      title: 'المجلة', sub: 'قصص ونصائح وحكمة للحياة الواعية.',
      readMore: 'اقرأ المزيد', category: 'الفئة',
    },
    legal: {
      breadcrumbHome: 'الرئيسية',
      category: 'القانونية والسياسات',
      haveQuestions: 'هل لديك أسئلة؟',
      haveQuestionsSub: 'فريقنا سعيد دائماً بمساعدتك.',
      contact: 'تواصل معنا',
    },
    auth: {
      loginTitle: 'أهلاً بعودتك',
      loginSub: 'سجّل الدخول إلى حسابك في سول لاف آند إيرث',
      email: 'البريد الإلكتروني', password: 'كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟', loginBtn: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟', registerLink: 'إنشاء حساب',
      registerTitle: 'إنشاء حساب جديد',
      registerSub: 'انضم إلى مجتمع سول لاف آند إيرث',
      firstName: 'الاسم الأول', lastName: 'اسم العائلة',
      phone: 'رقم الهاتف', confirmPassword: 'تأكيد كلمة المرور',
      registerBtn: 'إنشاء الحساب', hasAccount: 'لديك حساب بالفعل؟',
      loginLink: 'تسجيل الدخول', agreeText: 'بإنشاء حساب، فإنك توافق على',
      terms: 'الشروط والأحكام', and: 'و', privacy: 'سياسة الخصوصية',
    },
    common: {
      home: 'الرئيسية', backToTop: 'العودة للأعلى',
      loading: 'جارٍ التحميل…', errorGeneric: 'حدث خطأ ما.',
    },
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sle_lang') || 'en')

  useEffect(() => {
    localStorage.setItem('sle_lang', lang)
    document.documentElement.dir = translations[lang].dir
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]
  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
