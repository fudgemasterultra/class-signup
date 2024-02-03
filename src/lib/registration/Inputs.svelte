<script lang="ts">
  export let textData = '';
  export let inputType = 'text';
  export let placeHolder = '';
  export let error = false;

  function typeAction(node: any) {
    node.type = inputType;
  }
</script>

<div class="py-2 px-2 flex justify-center">
  <input
    bind:value={textData}
    use:typeAction
    placeholder={placeHolder}
    class="border-2 rounded-md py-1 px-2 {!error ? 'border-red-700' : ''}"
  />
</div>
