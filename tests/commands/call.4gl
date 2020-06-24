MAIN 

  CALL fgl_winmessage()

  CALL fgl_winmessage("p1")

  CALL fgl_winmessage("p1","p2")

  CALL fgl_winmessage("p1","p2", "p3")
  CALL fgl_winmessage(1,2,    3)

end main

function f1() 

  CALL fgl_winmessage() returning var1

  CALL fgl_winmessage() returning rec1.var1

  CALL fgl_winmessage() returning var1[ind1]

  CALL fgl_winmessage() returning var1 , var2

end function
