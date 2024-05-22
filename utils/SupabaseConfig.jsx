import { createClient } from '@supabase/supabase-js';

import { SUPABASE_ANON_KEY } from '@env';

export const supabase = createClient(
  'https://chckxeulrkurnggpgkkc.supabase.co',
  SUPABASE_ANON_KEY
);
