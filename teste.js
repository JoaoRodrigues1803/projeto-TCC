require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

(async () => {
    const { data, error } = await supabase.from('dados').select('*').limit(1);

    if (error) {
        console.error('Erro na conexão:', error);
    } else {
        console.log('Conexão bem-sucedida!', data);
    }
})();
