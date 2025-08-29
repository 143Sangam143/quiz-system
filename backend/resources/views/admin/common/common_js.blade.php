<script>
    function confirmDelete(button) {
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                button.closest('form').submit();
            }
        });
    }

    function statusUpdate(element,model,id)
    {
        console.log('clicked');
        const fieldName = element.name;
        const value = element.checked ?  1 : 0;

        var url = "{{route('status.update', ':id')}}".replace(':id', id);
        $.ajax({
            url: url,
            type: 'post',
            data: {
                _token: '{{csrf_token()}}',
                model: model,
                fieldName: fieldName,
                value: value
            },
            success: function(res){
                ajax_response(res);
            }
        })
    }
</script>