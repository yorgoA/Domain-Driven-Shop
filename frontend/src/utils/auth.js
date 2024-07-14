import supabase from '../supabase';

export async function getUserRole(userId) {
  console.log('Fetching role for user ID:', userId);
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user role:', error.message);
    throw error;
  }
  console.log('User role data:', data);
  return data.role;
}
