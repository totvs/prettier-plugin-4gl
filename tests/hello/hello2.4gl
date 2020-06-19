MAIN 

  DEFINE NOME CHAR(50) # abc
  PROMPT "DIGITE SEU NOME : " FOR NOME
  
  CALL fgl_winmessage( "HELLO",NOME, "info")
  
end MAIN
