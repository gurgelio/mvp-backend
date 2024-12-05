# frozen_string_literal: true

class JsonWebToken
  SECRET_KEY = 'Teriaqueseralgosegurosefossepraproducao'

  def self.encode(payload)
    "Bearer #{JWT.encode(payload, SECRET_KEY)}"
  end

  def self.decode(token)
    return nil if token.nil?

    decoded = JWT.decode(token.split(' ').last, SECRET_KEY)[0]
    puts decoded
    HashWithIndifferentAccess.new decoded
  end
end
