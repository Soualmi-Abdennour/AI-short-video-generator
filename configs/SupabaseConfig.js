
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lamjozhxcxmarxikbsne.supabase.co'
export const supabaseKey = process.env.SUPABASE_SERVICE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

