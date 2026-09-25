import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_PRODUCTS } from '../data/mockData';

export async function fetchProducts(brandFilter = 'ALL') {
  if (!isSupabaseConfigured) {
    if (brandFilter === 'Alpha') return INITIAL_PRODUCTS.filter(p => p.brand === 'Alpha');
    if (brandFilter === 'Beta') return INITIAL_PRODUCTS.filter(p => p.brand === 'Beta');
    return INITIAL_PRODUCTS;
  }

  let query = supabase.from('products').select('*');
  if (brandFilter !== 'ALL') {
    query = query.eq('brand', brandFilter);
  }

  const { data, error } = await query.order('created_at', { ascending: true });
  if (error) {
    console.error('Lỗi khi fetch products từ Supabase, fallback sang mock:', error);
    return INITIAL_PRODUCTS;
  }

  // Chuyển đổi dữ liệu từ format Postgres snake_case sang frontend camelCase nếu cần
  return data.map(item => ({
    id: item.id,
    brand: item.brand,
    name: item.name,
    category: item.category,
    targetUser: item.target_persona,
    problemStatement: item.problem_statement,
    keyMessage: item.key_message,
    domainExtensions: item.domain_extensions || [],
    metaSyncData: item.meta_sync_data || {},
    campaigns: item.campaigns || []
  }));
}

export async function createProduct(productData) {
  if (!isSupabaseConfigured) {
    return {
      ...productData,
      id: 'prod-' + Date.now(),
      created_at: new Date().toISOString()
    };
  }

  const payload = {
    id: productData.id || ('prod-' + Date.now()),
    brand: productData.brand,
    name: productData.name,
    category: productData.category || 'General',
    target_persona: productData.targetUser || productData.target_persona || '',
    problem_statement: productData.problemStatement || productData.problem_statement || '',
    key_message: productData.keyMessage || '',
    domain_extensions: productData.domainExtensions || [],
    meta_sync_data: productData.metaSyncData || {}
  };

  const { data, error } = await supabase.from('products').insert([payload]).select();
  if (error) throw error;
  return data[0];
}
