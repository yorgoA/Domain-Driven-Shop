const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://iqjkvgguvmssfzzegfyd.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/data', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('test')
            .select('*');

        if (error) {
            console.error('Error fetching data from Supabase:', error);
            return res.status(500).json({ error: error.message });
        }
        
        res.json(data);
    } catch (err) {
        console.error('Error in route handler:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/test2', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('test2')
            .select('*');

        if (error) {
            console.error('Error fetching data from Supabase:', error);
            return res.status(500).json({ error: error.message });
        }
        
        res.json(data);
    } catch (err) {
        console.error('Error in route handler:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/test3', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('test3')
            .select('*');

        if (error) {
            console.error('Error fetching data from Supabase:', error);
            return res.status(500).json({ error: error.message });
        }
        
        res.json(data);
    } catch (err) {
        console.error('Error in route handler:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
