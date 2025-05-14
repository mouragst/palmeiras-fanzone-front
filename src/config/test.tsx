export const testOrProduction = import.meta.env.VITE_ENV === 'production'
  ? null
  : <h3 style={{color: 'orange', textAlign: 'center', marginTop: '15px'}}>Base Teste</h3>;