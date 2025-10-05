import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {

  console.log('--- ROTA DE CADASTRO ACIONADA ---');
  
  try {
    const { name, email, password } = await request.json();

    // 1. Validação básica dos dados recebidos
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // 2. Verificar se o usuário já existe no banco
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      // Ignora o erro 'PGRST116' que significa "nenhum usuário encontrado"
      throw findError;
    }
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está em uso.' },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10); // O 10 é o "custo" do hash

    // 4. Inserir o novo usuário no banco de dados
    const { data, error: insertError } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (insertError) {
      throw insertError;
    }

    // 5. Retornar uma resposta de sucesso
    return NextResponse.json(
      { message: 'Usuário criado com sucesso!', user: data },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno no servidor.' },
      { status: 500 }
    );
  }
}