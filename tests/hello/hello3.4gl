main 

  define nome char(50) # abc
  <<<PRETTIER_RANGE_START>>>
  <|>prompt "digite seu nome : " for nome
  <<<PRETTIER_RANGE_END>>>
  call fgl_winmessage( "hello",nome, "info")
  
end main
