import re, os

CUSTOMER_KEYS = ['a01','a02','a02e','a03','a03e','a04','a05','a05d','a06l','a06','a06e','a06d','a07','a07e',
                 'a08','a08o','a08n','a09','a09n','a09e','a09b','a10','a10e','a11','a11e','a12','a13',
                 'a14','a14c','a14r','a15','a16','a17','a18']
MERCHANT_KEYS = ['b01','b02','b04','b05','b06','b07','b08','b08g','b09','b09e','b14','b10','b19','b12','b13',
                 'b11','b15','b15e','b16n','b16a','b16p','b16r','b16s','b16d','b16rej','b17','b17na','b17g','b18']
ADMIN_KEYS = ['c01','c16','c03','c03e','c17','c04','c05','c05e','c06','c09','c07','c07e','c08',
              'c10','c11','c18','c19','c12','c12e','c13','c14','c15']

def tree(regfile):
    subs, roots = [], []
    for line in open(regfile, encoding='utf-8'):
        m = re.search(r"key: '([a-z0-9]+)'", line)
        if not m:
            continue
        (subs if 'parent:' in line else roots).append(m.group(1))
    return roots, subs

print('=' * 54)
print('QA-1: ماسح المكوّنات المستخدمة دون استيراد')
# إنذارات كاذبة معروفة: Icon من مفكّك .map(({Icon})=>...) — callback لا يلتقطه regex تصريحات الدوال
# (بناء rollup يفشل على أي استيراد ناقص حقيقي، فنجاح البناء يثبت السلامة)
KNOWN_FP = {'src/screens/B01Welcome.jsx': {'Icon'}, 'src/screens/B07Dashboard.jsx': {'Icon'}, 'src/ui/mnav.jsx': {'Icon'}, 'src/ui/ashell.jsx': {'Icon'}}
miss = 0
for root, _, files in os.walk('src'):
    for fn in sorted(files):
        if not fn.endswith('.jsx'):
            continue
        p = os.path.join(root, fn)
        src = open(p).read()
        used = set(re.findall(r'<([A-Z][A-Za-z0-9]*)[\s/>]', src))
        defined = set(re.findall(r'(?:function|const|class)\s+([A-Z][A-Za-z0-9]*)', src))
        for m in re.finditer(r'import\s+([A-Z][A-Za-z0-9]*)\s+from', src):
            defined.add(m.group(1))
        for m in re.finditer(r'import\s*\{([^}]*)\}', src):
            for part in m.group(1).split(','):
                bits = part.strip().split(' as ')
                if bits and bits[0]:
                    defined.add(bits[-1].strip())
        defined |= set(re.findall(r'const\s+([A-Z][A-Za-z0-9]*)\s*=\s*\(', src))
        for m in re.finditer(r'(?:function|const)\s+[A-Za-z0-9]+\s*\(\s*\{([^}]*)\}', src):
            for part in m.group(1).split(','):
                bits = part.strip().split(':')
                if len(bits) == 2 and bits[1].strip()[:1].isupper():
                    defined.add(bits[1].strip())
                elif len(bits) == 1 and bits[0].strip()[:1].isupper():
                    defined.add(bits[0].strip())  # تفكيك مختصر: ({ Icon, label })
        m = (used - defined) - KNOWN_FP.get(p, set())
        if m:
            print('  X', p, '->', sorted(m))
            miss += 1
print('  OK نظيف' if miss == 0 else f'  X {miss} ملفات')

print('QA-2: فهرس العميل (registry.jsx)')
r, s = tree('src/ui/registry.jsx')
ok1 = sorted(r + s) == sorted(CUSTOMER_KEYS)
print(f'  {len(r+s)}/34 · جذور {len(r)} · حالات {len(s)} · {"OK" if ok1 else "X فرق: " + str(set(CUSTOMER_KEYS) ^ set(r+s))}')

print('QA-3: فهرس التاجر (registry_m.jsx)')
r2, s2 = tree('src/ui/registry_m.jsx')
ok2 = sorted(r2 + s2) == sorted(MERCHANT_KEYS)
print(f'  {len(r2+s2)}/29 · جذور {len(r2)} · حالات {len(s2)} · {"OK" if ok2 else "X فرق: " + str(set(MERCHANT_KEYS) ^ set(r2+s2))}')

print('QA-3b: فهرس الإدارة (registry_a.jsx)')
r3, s3 = tree('src/ui/registry_a.jsx')
ok3 = sorted(r3 + s3) == sorted(ADMIN_KEYS)
print(f'  {len(r3+s3)}/22 · جذور {len(r3)} · حالات {len(s3)} · {"OK" if ok3 else "X فرق: " + str(set(ADMIN_KEYS) ^ set(r3+s3))}')

print('QA-4: ملفات الشاشات المستوردة موجودة')
missing = []
for regfile in ['src/ui/registry.jsx', 'src/ui/registry_m.jsx', 'src/ui/registry_a.jsx']:
    reg = open(regfile).read()
    for f in set(re.findall(r"from '\.\./(screens/[A-Za-z0-9]+\.jsx)'", reg)):
        if not os.path.exists('src/' + f):
            missing.append(f)
print('  OK' if not missing else f'  X {missing}')

print('QA-5: أهداف التنقل go() كلها مسجلة')
allsrc = ''
for root, _, fs in os.walk('src'):
    for fn in fs:
        if fn.endswith('.jsx'):
            allsrc += open(os.path.join(root, fn)).read()
targets = set(re.findall(r"go\('([a-z0-9]+)'\)", allsrc))
unknown = targets - set(CUSTOMER_KEYS) - set(MERCHANT_KEYS) - set(ADMIN_KEYS)
print('  OK' if not unknown else f'  X غير مسجل: {unknown}')

print('QA-6: مفاتيح فريدة عبر التطبيقات الثلاثة')
allkeys = re.findall(r"key: '([a-z0-9]+)'", open('src/ui/registry.jsx').read() + open('src/ui/registry_m.jsx').read() + open('src/ui/registry_a.jsx').read())
dup = {k for k in allkeys if allkeys.count(k) > 1}
tot = len(CUSTOMER_KEYS) + len(MERCHANT_KEYS) + len(ADMIN_KEYS)
print(f'  {len(allkeys)}/{tot} إدخالًا · مكرر: {dup or "لا شيء OK"}')
print('=' * 54)
