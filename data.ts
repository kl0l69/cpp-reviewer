
import { Topic, PredictionRow, EssayQuestion } from './types';

export const essayQuestions: EssayQuestion[] = [
  {
    id: 'variable_rules',
    question: 'شروط تسمية المتغيرات (Identifiers Rules)',
    answer: '1. **البداية:** يجب أن يبدأ بحرف (A-Z, a-z) أو شرطة سفلية (_). **لا** يمكن أن يبدأ برقم.\n2. **المحتوى:** يمكن أن يحتوي على حروف، أرقام، وشُرط سفلية فقط.\n3. **الرموز الخاصة:** ممنوع استخدام المسافات أو الرموز مثل (@, #, $, %).\n4. **الكلمات المحجوزة:** لا يمكن تسمية المتغير بكلمة محجوزة في اللغة مثل (int, class, return, if).\n5. **حساسية الأحرف:** C++ لغة حساسة (Case Sensitive)، فالمتغير `Age` يختلف تماماً عن `age`.\n\n✅ أمثلة صحيحة: `my_var`, `_count`, `user1`\n❌ أمثلة خاطئة: `1user` (يبدأ برقم), `my-var` (يحتوي dash), `int` (كلمة محجوزة)'
  },
  {
    id: 'assignment_vs_equal',
    question: 'الفرق بين معامل التخصيص (=) ومعامل المساواة (==)',
    answer: '**= (Assignment Operator):**\nتُستخدم لإسناد أو تخزين قيمة في متغير (جهة اليمين توضع في جهة اليسار).\nمثال: `int x = 10;` (ضع القيمة 10 داخل المتغير x).\n\n**== (Equality Operator):**\nتُستخدم للمقارنة بين قيمتين، وترجع `true` (1) أو `false` (0).\nمثال: `if (x == 10)` (هل قيمة x تساوي 10؟).\n\n⚠️ **خطأ شائع:** استخدام `=` داخل جملة `if`، مما يؤدي دائماً لتنفيذ الشرط وتغيير قيمة المتغير بدلاً من مقارنته.'
  },
  {
    id: 'inc_dec_detailed',
    question: 'الفرق بين Postfix (x++) و Prefix (++x)',
    answer: '**Prefix (++x) - "زيد ثم استخدم":**\nيتم زيادة قيمة المتغير أولاً، ثم تُستخدم القيمة الجديدة في العملية الحالية.\nمثال: `y = ++x;` (إذا كانت x=5، تصبح x=6 ثم تُخزن 6 في y).\n\n**Postfix (x++) - "استخدم ثم زيد":**\nيتم استخدام القيمة الحالية للمتغير في العملية، ثم تتم زيادته بعد انتهاء السطر.\nمثال: `y = x++;` (إذا كانت x=5، تُخزن 5 في y، ثم تصبح x=6).\n\n**مثال عملي:**\nint x = 5;\ncout << x++; // يطبع 5\ncout << ++x; // (x كانت 6 وأصبحت 7) يطبع 7'
  },
  {
    id: 'grade_logic',
    question: 'تصميم الشروط المتداخلة (If-Else Logic for Grades)',
    answer: 'عند استخدام **if-else if**، يتم تنفيذ الشرط الأول الصحيح فقط ويتم تجاهل الباقي. لضمان الدقة:\n\n1. **ابدأ بالأكثر تخصيصاً (الأعلى):**\nيجب البدء بدرجة الامتياز (>= 90). لو بدأنا بـ (>= 50) لطالب حاصل على 95، سيطبع "Pass" ويخرج، وهذا خطأ.\n\n2. **التسلسل المنطقي:**\nif (degree >= 90) ...\nelse if (degree >= 80) ...\nelse if (degree >= 60) ...\nelse ... (للرسب)\n\nهذا يضمن أن الطالب لا يحصل إلا على تقدير واحد صحيح.'
  },
  {
    id: 'loops_comparison',
    question: 'مقارنة آليات التكرار (Loops: for, while, do-while)',
    answer: '1. **for loop**: \n- الخيار الأفضل عندما يكون عدد التكرارات معروفاً مسبقاً (Known number of iterations).\n- الهيكل يجمع (البداية، الشرط، والزيادة) في سطر واحد.\n\n2. **while loop**: \n- تُستخدم عندما يعتمد التكرار على شرط منطقي وليس عدداً محدداً.\n- يتم فحص الشرط **قبل** تنفيذ الكود (Pre-test). إذا كان الشرط خاطئاً من البداية، لن يعمل الكود مطلقاً.\n\n3. **do-while loop**: \n- تضمن تنفيذ الكود **مرة واحدة على الأقل**.\n- يتم فحص الشرط **بعد** تنفيذ الكود (Post-test loop).\n- مفيدة في قوائم الاختيار (Menus) والتحقق من الإدخال (Input Validation).'
  },
  {
    id: 'break_continue',
    question: 'الفرق الجوهري بين Break و Continue',
    answer: '**Break (كسر الحلقة):**\nتقوم بإنهاء الحلقة (Loop) فوراً والخروج منها، ويستمر البرنامج من السطر الذي يلي الحلقة.\n📌 **مثال:** الخروج من حلقة البحث بمجرد العثور على الرقم المطلوب.\n\n**Continue (استمرار/تخطي):**\nتتجاهل الأكواد المتبقية في الدورة **الحالية** فقط، وتجبر الحلقة على الانتقال فوراً للدورة التالية (فحص الشرط والزيادة).\n📌 **مثال:** حلقة تطبع الأرقام وتريد تخطي طباعة الأرقام السالبة (تستخدم continue مع السالب).'
  },
  {
    id: 'arrays_memory_algo',
    question: 'المصفوفات (Arrays) - الكفاءة والخوارزميات',
    answer: '**كفاءة الذاكرة:**\nالمصفوفة تخزن عناصر من **نفس النوع** في مواقع ذاكرة **متتالية** (Contiguous memory locations). هذا يسمح بالوصول لأي عنصر مباشرة باستخدام الـ Index بسرعة عالية جداً.\n\n**خوارزمية جمع الأعداد الفردية (Odd Sum):**\n1. عرّف متغير `sum = 0`.\n2. أنشئ حلقة `for` تبدأ من `i = 0` إلى `size - 1`.\n3. داخل الحلقة، ضع شرط: `if (arr[i] % 2 != 0)`.\n4. إذا تحقق الشرط، أضف القيمة للمجموع: `sum += arr[i]`.\n5. بعد الحلقة، اطبع `sum`.'
  },
  {
    id: 'pointers_2d',
    question: 'المصفوفة ثنائية البعد والمؤشرات (2D Arrays & Pointers)',
    answer: 'في ذاكرة الحاسوب، المصفوفة 2D لا تُخزن كشبكة حقيقية، بل كصف واحد طويل جداً (صفوف متتالية).\n\nللوصول للعنصر في الصف `i` والعمود `j` باستخدام المؤشرات:\nالمعادلة: `*(ptr + i * cols + j)`\n\n- `ptr`: عنوان بداية المصفوفة.\n- `i * cols`: نقفز عدد `i` من الصفوف الكاملة (كل صف طوله `cols`).\n- `+ j`: نتحرك `j` خطوات داخل الصف الحالي.\n- `*()`: نقوم بـ De-referencing للحصول على القيمة.'
  }
];

export const predictionTable: PredictionRow[] = [
  { topic: 'مقارنة الأعداد', code: 'if (num > 0) ...', result: 'يعتمد على المُدخل' },
  { topic: 'القيم في الـ Loop', code: 'for (int i = 1; i <= 10; i++) ...', result: '5040 (نتيجة الـ Factorial لـ 8)' },
  { topic: 'الـ Array Indexing', code: 'int a[4] = {5, 10, 15, 20}; cout << a[2] - a[0];', result: '10' },
  { topic: 'الـ String Indexing', code: 'string s = "Hello"; s[0] = \'J\'; cout << s;', result: 'Jello' },
  { topic: 'While Loop', code: 'int i=1; while(i<4) { cout<<i; i++; }', result: '123' },
  { topic: 'Do-While', code: 'int x=5; do{ cout<<x; x++; } while(x<5);', result: '5' },
  { topic: 'Postfix', code: 'int x=5; cout << x++;', result: '5' },
  { topic: 'Prefix', code: 'int x=5; cout << ++x;', result: '6' },
  { topic: 'Logical AND', code: 'cout << (5>3 && 5<10);', result: '1 (True)' },
  { topic: 'Logical OR', code: 'cout << (5>3 || 5<4);', result: '1 (True)' },
  { topic: 'Modulus', code: 'cout << 15 % 4;', result: '3' },
];

export const reviewData: Omit<Topic, 'icon'>[] = [
  {
    id: 'college_content',
    title: 'محتوى الكلية والمنهج (College Coursework)',
    snippets: [
      {
        id: 'act2.q1',
        title: '1. تتابع جمل If (Activity 2 - Q1)',
        description: 'لاحظ أن جمل if المنفصلة يتم فحصها جميعاً، بينما else ترتبط بآخر if فقط.',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 5;
    
    if (a > 2) 
        cout << "A"; // يتحقق الشرط (5 > 2) ويطبع A
        
    if (a < 10) // هذه جملة جديدة مستقلة
        cout << "B"; // يتحقق الشرط (5 < 10) ويطبع B
    else
        cout << "C"; // لن يتم تنفيذها لأن الـ if المرتبطة بها تحققت
        
    return 0;
}`,
        output: "Output = A B"
      },
      {
        id: 'act2.q2',
        title: '2. فحص النطاق (Activity 2 - Q2)',
        description: 'الطريقة الصحيحة لفحص ما إذا كان الرقم بين 10 و 20.',
        code: `// Incorrect: if (10 < num < 20)
// Incorrect: if (num > 10 || num < 20)

// Correct:
if (num >= 10 && num <= 20) {
    cout << "Number is in range [10, 20]";
}`,
      },
      {
        id: 'act2.q3',
        title: '3. التعيين داخل الشرط (Activity 2 - Q3)',
        description: 'الفرق الخطير بين = (Assign) و == (Equal) داخل جملة if.',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    
    // تنبيه: هنا تم استخدام = وليس ==
    // (a = b) تجعل a تساوي 20، وبما أن 20 قيمة غير صفرية، يعتبر الشرط true
    if (a = b) { 
        cout << "Equal";
    } else {
        cout << "Not Equal";
    }
    
    return 0;
}`,
        output: "Equal"
      },
      {
        id: 'act2.q4',
        title: '4. حلقة While البسيطة (Activity 2 - Q4)',
        description: 'تتبع قيم i داخل الحلقة.',
        code: `#include <iostream>
using namespace std;

int main() {
    int i = 1;
    while (i < 4) {
        cout << i << " ";
        i++;
    }
    // Iteration 1: i=1, prints 1, i becomes 2
    // Iteration 2: i=2, prints 2, i becomes 3
    // Iteration 3: i=3, prints 3, i becomes 4
    // Loop ends because 4 < 4 is false
    return 0;
}`,
        output: "1 2 3 "
      },
      {
        id: 'act2.q5',
        title: '5. سلوك Do-While (Activity 2 - Q5)',
        description: 'Do-While تنفذ الكود مرة واحدة على الأقل حتى لو الشرط خاطئ.',
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    do {
        cout << x << " ";
        x++;
    } while (x < 5); 
    // الشرط (6 < 5) خاطئ، لكن الطباعة حدثت مرة واحدة بالفعل
    
    return 0;
}`,
        output: "5"
      },
      {
        id: 'tut2.div',
        title: '6. القسمة الصحيحة والعشرية (Tutorial 2)',
        description: 'الفرق بين قسمة الأعداد الصحيحة وقسمة الأعداد العشرية.',
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 50, y = 4;
    
    // قسمة أعداد صحيحة (تهمل الكسور)
    cout << "Integer Division (50/4): " << x / y << endl; 
    
    // قسمة عشرية (يجب تحويل أحد الأطراف لـ float)
    cout << "Float Division: " << (float)x / y << endl; 
    
    return 0;
}`,
        output: "Integer Division: 12\nFloat Division: 12.5"
      },
      {
        id: 'tut3.inc',
        title: '7. تتبع الزيادة والنقصان (Tutorial 3)',
        description: 'أولوية العمليات مع ++ و --.',
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    cout << x++ << endl; // يطبع 5 ثم تصبح x=6
    cout << ++x << endl; // تصبح x=7 ثم يطبع 7
    cout << x << endl;   // يطبع 7 النهائية
    
    int m = 6, n = 2;
    // استخدام القيم
    cout << m++ << endl; // 6 (m becomes 7)
    cout << --n << endl; // 1 (n becomes 1)
    
    return 0;
}`,
        output: "5\n7\n7\n6\n1"
      },
      {
        id: 'tut3.op',
        title: '8. أولوية العمليات الحسابية (Tutorial 3)',
        description: 'الضرب والقسمة قبل الجمع والطرح.',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 2, c = 3, d;
    
    // d = 10 + (2 * 3) = 10 + 6 = 16
    d = a + b * c;
    cout << d << endl;
    
    // d = (3 * 10) / 2 = 30 / 2 = 15
    d = (c * a) / b;
    cout << d << endl;
    
    // d = 3 + (10 / 2) = 3 + 5 = 8
    d = c + a / b;
    cout << d << endl;
    
    return 0;
}`,
        output: "16\n15\n8"
      },
      {
         id: 'tut3.mod',
         title: '9. حساب باقي القسمة (Tutorial 3)',
         description: 'قواعد المودلس (Modulus) الهامة.',
         code: `#include <iostream>
using namespace std;

int main() {
    // 1. الرقم % نفسه = 0
    cout << "5 % 5 = " << 5 % 5 << endl;
    
    // 2. الصغير % الكبير = الصغير
    cout << "4 % 5 = " << 4 % 5 << endl;
    
    // 3. الكبير % الصغير = الباقي
    cout << "7 % 5 = " << 7 % 5 << endl; // (7 - 5 = 2)
    
    return 0;
}`,
         output: "5 % 5 = 0\n4 % 5 = 4\n7 % 5 = 2"
      },
      {
        id: 'lec4.even',
        title: '10. فحص الزوجي والفردي (Lecture 4)',
        description: 'استخدام باقي القسمة لتحديد نوع العدد.',
        code: `#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter number: ";
    cin >> num;
    
    if (num % 2 == 0) {
        cout << "Even";
    } else {
        cout << "Odd";
    }
    return 0;
}`
      },
      {
        id: 'lec5.inf',
        title: '11. الحلقة اللانهائية (Lecture 5)',
        description: 'خطأ شائع يؤدي إلى تكرار الكود بلا توقف.',
        code: `// خطأ: استخدام = بدلاً من == في شرط الحلقة
// while (i = 1) { ... } 
// هذا يجعل الشرط دائماً صحيحاً (1)

// الصحيح:
int i = 1;
while (i <= 10) {
    cout << i << " ";
    i++; // نسيان هذا السطر أيضاً يسبب حلقة لانهائية
}`
      },
      {
        id: 'sheet4.ex1',
        title: '12. فحص الإشارة (Sheet 4 - Q1)',
        description: 'تحديد ما إذا كان الرقم موجباً، سالباً، أو صفراً.',
        code: `#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;

    if (num > 0)
        cout << "Positive";
    else if (num < 0)
        cout << "Negative";
    else
        cout << "Zero";

    return 0;
}`
      },
      {
        id: 'sheet4.ex2',
        title: '13. نظام التقديرات الكامل (Sheet 4 - Q2)',
        description: 'تحويل الدرجة الرقمية إلى تقدير لفظي.',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Enter score: ";
    cin >> score;

    if (score >= 90) cout << "Excellent";
    else if (score >= 75) cout << "Very Good";
    else if (score >= 60) cout << "Good";
    else if (score >= 50) cout << "Pass";
    else cout << "Fail";

    return 0;
}`
      },
      {
        id: 'sheet4.ex4',
        title: '14. جدول الضرب (Sheet 4 - Q4)',
        description: 'استخدام حلقة for لطباعة جدول الضرب.',
        code: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    for(int i=1; i<=10; i++) {
        cout << n << " * " << i << " = " << n*i << endl;
    }
    return 0;
}`
      },
      {
        id: 'sheet4.ex5',
        title: '15. الجمع التراكمي (Sheet 4 - Q5)',
        description: 'استخدام Do-While لجمع الأرقام حتى يدخل المستخدم 0.',
        code: `#include <iostream>
using namespace std;

int main() {
    int num, sum = 0;
    do {
        cout << "Enter number (0 to stop): ";
        cin >> num;
        sum += num;
    } while(num != 0);
    
    cout << "Total Sum: " << sum;
    return 0;
}`
      },
      {
        id: 'assign1.full',
        title: '16. إدارة درجات الطلاب (Assignment 2)',
        description: 'حل شامل لمشكلة حساب درجات الطلاب والمتوسط والناجحين.',
        code: `#include <iostream>
using namespace std;

int main() {
    int numStudents;
    cout << "Enter number of students: ";
    cin >> numStudents;
    
    int passed = 0, failed = 0;
    double totalAverage = 0;

    for(int i=1; i<=numStudents; i++) {
        string name;
        double m1, m2, m3;
        
        cout << "Student " << i << " Name: ";
        cin >> name;
        cout << "Enter 3 marks: ";
        cin >> m1 >> m2 >> m3;
        
        double avg = (m1 + m2 + m3) / 3.0;
        totalAverage += avg;
        
        cout << "Average: " << avg << " -> ";
        
        if(avg >= 50) {
            cout << "Pass" << endl;
            passed++;
        } else {
            cout << "Fail" << endl;
            failed++;
        }
    }
    
    cout << "Total Passed: " << passed << endl;
    cout << "Total Failed: " << failed << endl;
    cout << "Class Average: " << totalAverage / numStudents << endl;
    
    return 0;
}`
      },
      {
        id: 'assign3.ptr',
        title: '17. المصفوفات والمؤشرات (Assignment 3)',
        description: 'الوصول لعناصر مصفوفة 2D باستخدام المؤشرات.',
        code: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int rows = 2, cols = 3;
    int arr[2][3];
    
    cout << "Enter elements:\\n";
    for(int i=0; i<rows; i++) {
        for(int j=0; j<cols; j++) {
            cin >> arr[i][j];
        }
    }
    
    int posSum = 0, negSum = 0;
    // استخدام مؤشر لبداية المصفوفة
    int *ptr = &arr[0][0];
    
    for(int i=0; i < rows*cols; i++) {
        int val = *(ptr + i); // المشي خطوة خطوة في الذاكرة
        if(val > 0) posSum += val;
        else if(val < 0) negSum += val;
    }
    
    cout << "Pos Sum: " << posSum << endl;
    cout << "Neg Sum: " << negSum << endl;
    
    return 0;
}`
      },
      {
        id: 'lec1.esc',
        title: '18. الرموز الخاصة Escape Sequences (Lecture 1)',
        description: 'استخدام \\n للسطر الجديد و \\t للمسافة البادئة.',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Line 1\\nLine 2"; // سطر جديد
    cout << "\\nCol1\\tCol2";   // مسافة Tab
    cout << "\\nShe said \\"Hello\\""; // طباعة علامة التنصيص
    return 0;
}`,
        output: "Line 1\nLine 2\nCol1    Col2\nShe said \"Hello\""
      }
    ]
  },
  {
    id: 'basics',
    title: 'أساسيات المتغيرات والحساب',
    snippets: [
      {
        id: '1.1',
        title: '1.1. تعريف المتغيرات والطباعة',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Mona";
    int age = 20;
    char grade = 'A';
    
    cout << "Student Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Grade: " << grade << endl;
    
    return 0;
}`
      },
      {
        id: '1.2',
        title: '1.2. إدخال بيانات المستخدم والترحيب',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    
    cout << "Enter your name: ";
    cin >> name;
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Hello, " << name << "! You are " << age << " years old." << endl;
    
    return 0;
}`
      },
      {
        id: '1.3',
        title: '1.3. العمليات الحسابية الأساسية',
        code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    
    cout << "Enter two numbers: ";
    cin >> a >> b;
    
    cout << "Sum = " << a + b << endl;
    cout << "Difference = " << a - b << endl;
    cout << "Product = " << a * b << endl;
    cout << "Quotient = " << a / b << endl; // قسمة صحيحة (Integer Division)
    cout << "Remainder = " << a % b << endl; // باقي القسمة (Modulus)
    
    return 0;
}`
      }
    ]
  },
  {
    id: 'operators_advanced',
    title: 'المعاملات (Increment & Logical)',
    snippets: [
        {
            id: 'op.1',
            title: '1. الفرق بين Prefix و Postfix Increment',
            description: 'يوضح هذا المثال الفرق الجوهري بين ++x و x++ في التعبيرات.',
            code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    
    // Postfix: يتم استخدام القيمة الحالية (5) ثم الزيادة
    cout << "x++ = " << x++ << endl; // يطبع 5
    // أصبحت x الآن 6
    
    // Prefix: يتم الزيادة أولاً (تصبح 7) ثم استخدام القيمة
    cout << "++x = " << ++x << endl; // يطبع 7
    
    return 0;
}`,
            output: "x++ = 5\n++x = 7"
        },
        {
            id: 'op.2',
            title: '2. المعاملات المنطقية (&&, ||, !)',
            description: 'أمثلة على AND و OR و NOT.',
            code: `#include <iostream>
using namespace std;

int main() {
    int x = 5, y = 3;
    
    // AND: كلاهما صحيح
    if (x > 0 && y > 0) 
        cout << "Both Positive" << endl;
        
    // OR: أحدهما صحيح
    if (x == 5 || y == 100) 
        cout << "At least one is true" << endl;
        
    // NOT: عكس الشرط
    if (!(x == y)) 
        cout << "x is not equal to y" << endl;
        
    return 0;
}`
        }
    ]
  },
  {
    id: 'conditions',
    title: 'الشروط والحلقات التكرارية',
    snippets: [
      {
        id: '2.1',
        title: '2.1. فحص العدد (Positive, Negative, Zero)',
        code: `#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter a number: ";
    cin >> num;
    
    if (num > 0)
        cout << "Positive";
    else if (num < 0)
        cout << "Negative";
    else
        cout << "Zero";
        
    return 0;
}`
      },
      {
        id: '2.2',
        title: '2.2. تقييم الدرجة (Grade Evaluation)',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Enter score (0-100): ";
    cin >> score;
    
    if (score >= 90)
        cout << "Excellent";
    else if (score >= 80)
        cout << "Very Good";
    else if (score >= 70)
        cout << "Good";
    else if (score >= 60)
        cout << "Pass";
    else
        cout << "Fail";
        
    return 0;
}`
      },
      {
        id: '2.4',
        title: '2.4. حساب مجموع الأرقام من 1 إلى n (while loop)',
        code: `#include <iostream>
using namespace std;

int main() {
    int n, i = 1, sum = 0;
    cout << "Enter n: ";
    cin >> n;
    
    while (i <= n) {
        sum += i;
        i++;
    }
    
    cout << "Sum=" << sum;
    return 0;
}`
      },
      {
        id: '2.5',
        title: '2.5. جدول الضرب (for loop)',
        code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        cout << "5x" << i << "=" << 5 * i << endl;
    }
    return 0;
}`
      },
      {
        id: '2.6',
        title: '2.6. إيقاف الإدخال بالصفر (do-while loop)',
        code: `#include <iostream>
using namespace std;

int main() {
    int num, sum = 0;
    
    do {
        cout << "Enter a number (0 to stop): ";
        cin >> num;
        sum += num;
    } while (num != 0);
    
    cout << "Total sum = " << sum;
    return 0;
}`
      },
      {
          id: '2.8',
          title: '2.8. Break و Continue',
          description: 'استخدام Break لإيقاف الحلقة و Continue لتخطي دورة واحدة.',
          code: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            break; // يوقف الحلقة تماماً عندما i تساوي 5
        }
        if (i % 2 == 0) {
            continue; // يتخطى الطباعة للأعداد الزوجية
        }
        cout << i << " ";
    }
    return 0;
}`,
          output: "1 3"
      }
    ]
  },
  {
    id: 'arrays',
    title: 'المصفوفات والعمليات عليها',
    snippets: [
      {
        id: '3.1',
        title: '3.1. تعريف المصفوفة وطباعتها',
        code: `#include <iostream>
using namespace std;

int main() {
    int num[5] = {2, 4, 6, 8, 10};
    
    cout << "Array elements are: ";
    for (int i = 0; i < 5; i++) {
        cout << num[i] << " ";
    }
    cout << endl;
    
    return 0;
}`
      },
      {
        id: '3.3',
        title: '3.3. حساب مجموع عناصر المصفوفة',
        code: `#include <iostream>
using namespace std;

int main() {
    int numbers[5];
    int sum = 0;
    
    cout << "Enter 5 numbers: ";
    for (int i = 0; i < 5; i++) {
        cin >> numbers[i];
        sum += numbers[i]; // يتم إضافة القيمة للمجموع مباشرة بعد إدخالها
    }
    
    cout << "The sum is: " << sum << endl;
    return 0;
}`
      },
      {
        id: '3.4',
        title: '3.4. حساب عدد الأعداد الزوجية والفردية في مصفوفة',
        code: `#include <iostream>
using namespace std;

int main() {
    int numbers[8];
    int evenCount = 0, oddCount = 0;
    
    cout << "Enter 8 numbers: ";
    // 1. إدخال القيم
    for (int i = 0; i < 8; i++) {
        cin >> numbers[i];
    }
    
    // 2. العد
    for (int i = 0; i < 8; i++) {
        if (numbers[i] % 2 == 0)
            evenCount++;
        else
            oddCount++;
    }
    
    cout << "Number of even: " << evenCount << endl;
    cout << "Number of odd: " << oddCount << endl;
    return 0;
}`
      },
      {
        id: '3.5',
        title: '3.5. جمع مصفوفتين A و B في مصفوفة C',
        code: `#include <iostream>
using namespace std;

int main() {
    int A[5], B[5], C[5];
    
    cout << "Enter 5 elements for array A: ";
    for (int i = 0; i < 5; i++) {
        cin >> A[i];
    }
    
    cout << "Enter 5 elements for array B: ";
    for (int i = 0; i < 5; i++) {
        cin >> B[i];
    }
    
    // حساب C = A + B
    cout << "Array C (sum of A and B) is: ";
    for (int i = 0; i < 5; i++) {
        C[i] = A[i] + B[i];
        cout << C[i] << " ";
    }
    cout << endl;
    
    return 0;
}`
      }
    ]
  },
  {
    id: 'pointers',
    title: 'المؤشرات (Pointers)',
    snippets: [
      {
        id: '5.1',
        title: '5.1. تعريف المؤشر والوصول للقيمة (Declaration & Dereferencing)',
        code: `#include <iostream>
using namespace std;

int main() {
    int var = 20;   // متغير عادي
    int* ptr;       // إعلان مؤشر
    ptr = &var;     // تخزين عنوان var في المؤشر

    cout << "Value of var: " << var << endl;
    cout << "Address of var (&var): " << &var << endl;
    cout << "Value stored in ptr: " << ptr << endl;      // عنوان الذاكرة
    cout << "Value pointed to by ptr (*ptr): " << *ptr << endl; // القيمة الفعلية (20)

    return 0;
}`
      },
      {
        id: '5.2',
        title: '5.2. الحسابات على المؤشرات (Pointer Arithmetic)',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[3] = {10, 20, 30};
    int* ptr = arr; // المؤشر يشير تلقائياً لأول عنصر في المصفوفة

    cout << *ptr << endl;     // يطبع 10

    ptr++; // الانتقال للعنوان التالي (العنصر التالي)
    cout << *ptr << endl;     // يطبع 20

    ptr++; 
    cout << *ptr << endl;     // يطبع 30

    return 0;
}`
      },
      {
        id: '5.3',
        title: '5.3. تغيير القيمة باستخدام المؤشر',
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int* p = &x;

    cout << "Before: " << x << endl; // 5

    *p = 100; // تغيير القيمة في العنوان الذي يشير إليه p

    cout << "After: " << x << endl;  // 100
    return 0;
}`
      }
    ]
  },
  {
    id: 'predict',
    title: 'أكواد "Predict Output" الهامة',
    snippets: [
      {
        id: '4.1',
        title: '1. الجمع داخل الـ Loop مع الزيادة المضاعفة (i+=2)',
        code: `#include <iostream>
using namespace std;

int main() {
    int a[4] = {5, 10, 15, 20}; 
    int x = 0;
    
    // i = 1 (a[1]=10) , i = 3 (a[3]=20)
    for (int i = 1; i < 4; i += 2) { 
        x += a[i];
    }
    
    cout << x; 
    return 0;
}`,
        output: "الناتج: 30"
      },
      {
        id: '4.2',
        title: '2. تعديل قيم المصفوفة',
        code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50}; // Index 0 1 2 3 4
    
    arr[0] = arr[3]; // arr[0] = 40. المصفوفة: {40, 20, 30, 40, 50}
    
    // arr[3] = arr[1] (20) + arr[2] (30)
    arr[3] = arr[1] + arr[2]; // arr[3] = 50. المصفوفة: {40, 20, 30, 50, 50}
    
    cout << arr[3];
    return 0;
}`,
        output: "الناتج: 50"
      }
    ]
  }
];
