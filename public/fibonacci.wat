(module
  (func $fibonacci (export "fibonacci") (param $n i32) (result i32)
    (local $i i32)
    (local $a i32)
    (local $b i32)
    (local $temp i32)
    
    ;; Handle base cases
    (if (i32.lt_s (local.get $n) (i32.const 2))
      (then
        (return (local.get $n))
      )
    )
    
    ;; Initialize variables
    (local.set $a (i32.const 0))
    (local.set $b (i32.const 1))
    (local.set $i (i32.const 2))
    
    ;; Loop to calculate Fibonacci
    (loop $loop
      (local.set $temp (i32.add (local.get $a) (local.get $b)))
      (local.set $a (local.get $b))
      (local.set $b (local.get $temp))
      
      (br_if $loop
        (i32.lt_s 
          (local.tee $i (i32.add (local.get $i) (i32.const 1)))
          (i32.add (local.get $n) (i32.const 1))
        )
      )
    )
    
    (local.get $b)
  )
)

